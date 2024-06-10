import cv2
import time
import pygame
import mediapipe as mp
import threading
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

# Initialize pygame
pygame.init()
pygame.mixer.init()

# Function to calculate the angle between three points
def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    
    if angle > 180.0:
        angle = 360 - angle
    
    return angle

# Function to calculate distance between two points
def calculate_distance(a, b):
    a = np.array(a)
    b = np.array(b)
    return np.linalg.norm(a - b)


last_play_time_crunch_incorrect = 0
last_play_time_joints_visible1 = 0
last_play_time_arms_low = 0
last_play_time_joints_visible2 = 0
last_play_time_hands_low = 0
last_play_time_joints_visible3 = 0

crunch_incorrect = "src\\Python\\static\\audio\\crunch_incorrect.mp3"
joints_visible = "src\\Python\\static\\audio\\notinframe.mp3"
arms_high = "src\\Python\\static\\audio\\arms_too_high.mp3"
hands_low = "src\\Python\\static\\audio\\low_hands.mp3"
alert_sound = pygame.mixer.Sound("src\\Python\\static\\audio\\alert.mp3")
notinframe_sound = pygame.mixer.Sound("src\\Python\\static\\audio\\notinframe.mp3")
legs_wide_sound = pygame.mixer.Sound("src\\Python\\static\\audio\\legs too wide.mp3")

def play_audio(sound):
    sound.play()

def shoulder_press():
    global last_play_time_hands_low
    global last_play_time_joints_visible

    cap = cv2.VideoCapture(0)

    counter = 0
    stage = None
    prev_stage = None

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            frame = cv2.flip(frame, 1)
            if not ret:
                break

            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            required_joints_visible = False
            try:
                landmarks = results.pose_landmarks.landmark

                shoulder_l = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                elbow_l = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
                wrist_l = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
                hip_l = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]

                shoulder_r = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
                elbow_r = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
                wrist_r = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]
                hip_r = [landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y]

                angle_l = calculate_angle(shoulder_l, elbow_l, wrist_l)
                angle_r = calculate_angle(shoulder_r, elbow_r, wrist_r)
                angle_torso_arm_l = calculate_angle(hip_l, shoulder_l, elbow_l)
                angle_torso_arm_r = calculate_angle(hip_r, shoulder_r, elbow_r)

                required_joints_visible = all(coord is not None for coord in hip_l + shoulder_l + wrist_l + elbow_l + hip_r + shoulder_r + wrist_r + elbow_r)

                if (angle_l > 150 and angle_r > 150) and (angle_torso_arm_l > 150 and angle_torso_arm_r > 150):
                    stage = "pressing"
                elif (95 < angle_l < 150 and 95 < angle_r < 150) and (95 < angle_torso_arm_l < 150 and 95 < angle_torso_arm_r < 150):
                    stage = "lowered"
                
                if stage == "pressing" and prev_stage == "lowered":
                    counter += 1
                    print("Shoulder Press Count:", counter)
                
                prev_stage = stage

                hands_too_low = True if angle_torso_arm_l < 80 and angle_torso_arm_r < 80 else False

            except Exception as e:
                print(f"Error processing pose: {e}")

            cv2.rectangle(image, (0, 0), (320, 83), (245, 117, 16), -1)

            cv2.putText(image, 'REPS', (15, 12),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
            cv2.putText(image, str(counter),
                    (18, 70),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 255, 255), 2, cv2.LINE_AA)

            cv2.putText(image, 'STAGE', (165, 12),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
            cv2.putText(image, stage,
                    (120, 70),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.2, (255, 255, 255), 2, cv2.LINE_AA)
          

            if required_joints_visible:
                if hands_too_low:
                    error = "Hands too low"
                    cv2.rectangle(image, (0, 420), (640, 480), (0, 0, 255), -1)
                    cv2.putText(image, error, (240, 450), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2, cv2.LINE_AA)
                 
                    current_time = time.time()
                    if (current_time - last_play_time_hands_low) > 5:
                        pygame.mixer.music.load(hands_low)
                        pygame.mixer.music.play()
                        last_play_time_hands_low = current_time
                    
            else:
                cv2.rectangle(image, (0, image.shape[0] - 40), (image.shape[1], image.shape[0]), (0, 0, 255), -1)
                cv2.putText(image, 'Joints not visible', (10, image.shape[0] - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)
            
                current_time = time.time()
                if (current_time - last_play_time_joints_visible) > 5:
                    pygame.mixer.music.load(joints_visible)
                    pygame.mixer.music.play()
                    last_play_time_joints_visible = current_time
            
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                    mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                                    mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2))
            
                    # Resizeable window
            cv2.namedWindow('Shoulder Press Detection', cv2.WINDOW_NORMAL)
            cv2.resizeWindow('Shoulder Press Detection', 1800, 1200)  # Set the initial size of the window

            # Get the current window size
            _, _, window_width, window_height = cv2.getWindowImageRect('Shoulder Press Detection')

            # Calculate the aspect ratio of the frame
            frame_height, frame_width = image.shape[:2]
            aspect_ratio = frame_width / frame_height

            # Calculate new dimensions to maintain aspect ratio
            new_width = window_width
            new_height = int(new_width / aspect_ratio)
            if new_height > window_height:
                new_height = window_height
                new_width = int(new_height * aspect_ratio)

            # Resize the image to fit the window while maintaining aspect ratio
            resized_image = cv2.resize(image, (new_width, new_height))

            # Create a black canvas of the window size
            canvas = np.zeros((window_height, window_width, 3), dtype=np.uint8)

            # Calculate padding to center the resized image on the canvas
            x_offset = (window_width - new_width) // 2
            y_offset = (window_height - new_height) // 2

            # Place the resized image on the canvas
            canvas[y_offset:y_offset + new_height, x_offset:x_offset + new_width] = resized_image

            cv2.imshow('Shoulder Press Detection', canvas)

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

    cap.release()
    cv2.destroyAllWindows()

@app.route('/shoulder_press', methods=['POST'])
def run_shoulder_press():
    try:
        shoulder_press()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    


def crunches():
    global last_play_time_crunch_incorrect
    global last_play_time_joints_visible

    # Initialize webcam
    cap = cv2.VideoCapture(0)

    # Crunches counter variables
    counter = 0
    stage = None
    prev_stage = None

    # Setup MediaPipe instance
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            frame = cv2.flip(frame, 1)
            if not ret:
                break

            # Recolor image to RGB
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            
            image.flags.writeable = False

            # Make detection
            results = pose.process(image)

            # Recolor back to BGR
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            required_joints_visible = False  # Initialize required_joints_visible variable
            # Extract landmarks
            try:
                landmarks = results.pose_landmarks.landmark

                # Get coordinates for left shoulder, hip, and knee
                shoulder_l = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                hip_l = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
                knee_l = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]

                # Get coordinates for right shoulder, hip, and knee
                shoulder_r = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
                hip_r = [landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y]
                knee_r = [landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].y]

                # Calculate angles for both sides
                angle_l = calculate_angle(shoulder_l, hip_l, knee_l)
                angle_r = calculate_angle(shoulder_r, hip_r, knee_r)

                required_joints_visible = all(coord is not None for coord in shoulder_l + hip_l + knee_l + shoulder_r + hip_r + knee_r)

                # Crunches counter logic
                if (angle_l < 90 and angle_r < 90):
                    stage = "up"
                elif (angle_l > 100 and angle_r > 100):  
                    stage = "down"
                
                if stage == "up" and prev_stage == "down":
                    counter += 1
                    print("Crunches Count:", counter)
                
                prev_stage = stage

                crunch_incorrect_form = True if angle_l > 120 and angle_r > 120 else False

            except:
                pass

            # Render crunches counter
            # Setup status box
            cv2.rectangle(image, (0, 0), (320, 83), (245, 117, 16), -1)

            # Reps data
            cv2.putText(image, 'REPS', (15, 12),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
            cv2.putText(image, str(counter),
                        (18, 70),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 255, 255), 2, cv2.LINE_AA)

            # Stage data
            cv2.putText(image, 'STAGE', (165, 12),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
            cv2.putText(image, stage,
                        (120, 70),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.2, (255, 255, 255), 2, cv2.LINE_AA)
            
            # Incorrect form
            if required_joints_visible:
                if crunch_incorrect_form:
                    error = "Incorrect form"
                    cv2.rectangle(image, (0, 420), (640, 480), (0, 0, 255), -1)
                    cv2.putText(image, error, (240, 450), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2, cv2.LINE_AA)
                        
                    # Play audio once and then repeat after 5 seconds
                    current_time = time.time()
                    if current_time - last_play_time_crunch_incorrect > 5:  # Play audio once and then repeat after 5 seconds
                        pygame.mixer.music.load(crunch_incorrect)
                        pygame.mixer.music.play()
                        last_play_time_crunch_incorrect = current_time
            else:
                cv2.rectangle(image, (0, image.shape[0] - 40), (image.shape[1], image.shape[0]), (0, 0, 255), -1)
                cv2.putText(image, 'Joints not visible', (10, image.shape[0] - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)
                
                # Play audio once and then repeat after 5 seconds
                current_time = time.time()
                if current_time - last_play_time_joints_visible > 5:  # Play audio once and then repeat after 5 seconds
                    pygame.mixer.music.load(joints_visible)
                    pygame.mixer.music.play()
                    last_play_time_joints_visible = current_time

            # Render detections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                    mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                                    mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2))
                # Resizeable window
            cv2.namedWindow('Crunch Detection', cv2.WINDOW_NORMAL)
            cv2.resizeWindow('Crunch Detection', 1800, 1200)  # Set the initial size of the window

            # Get the current window size
            _, _, window_width, window_height = cv2.getWindowImageRect('Crunch Detection')

            # Calculate the aspect ratio of the frame
            frame_height, frame_width = image.shape[:2]
            aspect_ratio = frame_width / frame_height

            # Calculate new dimensions to maintain aspect ratio
            new_width = window_width
            new_height = int(new_width / aspect_ratio)
            if new_height > window_height:
                new_height = window_height
                new_width = int(new_height * aspect_ratio)

            # Resize the image to fit the window while maintaining aspect ratio
            resized_image = cv2.resize(image, (new_width, new_height))

            # Create a black canvas of the window size
            canvas = np.zeros((window_height, window_width, 3), dtype=np.uint8)

            # Calculate padding to center the resized image on the canvas
            x_offset = (window_width - new_width) // 2
            y_offset = (window_height - new_height) // 2

            # Place the resized image on the canvas
            canvas[y_offset:y_offset + new_height, x_offset:x_offset + new_width] = resized_image

            cv2.imshow('Crunch Detection', canvas)

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

        # Release resources
        cap.release()
        cv2.destroyAllWindows()

@app.route('/crunches', methods=['POST'])
def run_crunches():
    try:
        crunches()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    

def lateral_raises():
    global last_play_time_arms_low
    global last_play_time_joints_visible

    cap = cv2.VideoCapture(0)

    counter = 0
    stage = None
    prev_stage = None

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            frame = cv2.flip(frame, 1)
            if not ret:
                break

            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            required_joints_visible = False
            try:
                landmarks = results.pose_landmarks.landmark

                shoulder_l = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                elbow_l = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
                wrist_l = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
                hip_l = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]

                shoulder_r = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
                elbow_r = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
                wrist_r = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]
                hip_r = [landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y]

                angle_h_s_e_l = calculate_angle(hip_l, shoulder_l, elbow_l)
                angle_h_s_e_r = calculate_angle(hip_r, shoulder_r, elbow_r)

                required_joints_visible = all(coord is not None for coord in hip_l + hip_r + shoulder_l + elbow_l + wrist_l + shoulder_r + elbow_r + wrist_r)

                if (angle_h_s_e_l > 100 and angle_h_s_e_r > 100):
                    stage = "raised"
                elif(50 < angle_h_s_e_l < 75 and 50 < angle_h_s_e_r < 75):  
                    stage = "lowered"
                
                if stage == "raised" and prev_stage == "lowered":
                    counter += 1
                    print("Lateral Raises Count:", counter)
                
                prev_stage = stage

                arms_too_high = True if angle_h_s_e_l > 100 and angle_h_s_e_r > 100 else False

            except Exception as e:
                print(f"Error processing pose: {e}")

             # Render lateral raises counter
            # Setup status box
            cv2.rectangle(image, (0, 0), (320, 83), (245, 117, 16), -1)

        # Reps data
            cv2.putText(image, 'REPS', (15, 12),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
            cv2.putText(image, str(counter),
                    (18, 70),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 255, 255), 2, cv2.LINE_AA)

        # Stage data
            cv2.putText(image, 'STAGE', (165, 12),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
            cv2.putText(image, stage,
                    (120, 70),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.2, (255, 255, 255), 2, cv2.LINE_AA)
          

            if required_joints_visible:
                if arms_too_high:
                    error = "Arms too high"
                    cv2.rectangle(image, (0, 420), (640, 480), (0, 0, 255), -1)
                    cv2.putText(image, error, (240, 450), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2, cv2.LINE_AA)
                 
                    current_time = time.time()
                    if (current_time - last_play_time_arms_low) > 5:
                        pygame.mixer.music.load(arms_high)
                        pygame.mixer.music.play()
                        last_play_time_arms_low = current_time
                    
            else:
                cv2.rectangle(image, (0, image.shape[0] - 40), (image.shape[1], image.shape[0]), (0, 0, 255), -1)
                cv2.putText(image, 'Joints not visible', (10, image.shape[0] - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)
            
                current_time = time.time()
                if (current_time - last_play_time_joints_visible) > 5:
                    pygame.mixer.music.load(joints_visible)
                    pygame.mixer.music.play()
                    last_play_time_joints_visible = current_time
            
            # Render detections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                  mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                                  mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2))

# Resizeable window
            cv2.namedWindow('Lateral Raise Detection', cv2.WINDOW_NORMAL)
            cv2.resizeWindow('Lateral Raise Detection', 1800, 1200)  # Set the initial size of the window

            # Get the current window size
            _, _, window_width, window_height = cv2.getWindowImageRect('Lateral Raise Detection')

            # Calculate the aspect ratio of the frame
            frame_height, frame_width = image.shape[:2]
            aspect_ratio = frame_width / frame_height

            # Calculate new dimensions to maintain aspect ratio
            new_width = window_width
            new_height = int(new_width / aspect_ratio)
            if new_height > window_height:
                new_height = window_height
                new_width = int(new_height * aspect_ratio)

            # Resize the image to fit the window while maintaining aspect ratio
            resized_image = cv2.resize(image, (new_width, new_height))

            # Create a black canvas of the window size
            canvas = np.zeros((window_height, window_width, 3), dtype=np.uint8)

            # Calculate padding to center the resized image on the canvas
            x_offset = (window_width - new_width) // 2
            y_offset = (window_height - new_height) // 2

            # Place the resized image on the canvas
            canvas[y_offset:y_offset + new_height, x_offset:x_offset + new_width] = resized_image

            cv2.imshow('Lateral Raise Detection', canvas)

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break
# Release resources
    cap.release()
    cv2.destroyAllWindows()


    #         window_name = 'Lateral Raises Detection'
    #         cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
    #         cv2.resizeWindow(window_name, 1800, 1200)
    #         window_width = 1800
    #         window_height = 1200

    #         image_resized = cv2.resize(image, (window_width, window_height))

    #         cv2.imshow(window_name, image_resized)

    #         if cv2.waitKey(10) & 0xFF == ord('q'):
    #             break

    # cap.release()
    # cv2.destroyAllWindows()

@app.route('/lateral_raises', methods=['POST'])
def run_lateral_raises():
    try:
        lateral_raises()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

def bicep_curl_detection():
    # Initialize webcam
    cap = cv2.VideoCapture(0)

    # Bicep CURL counter variables
    counter = 0
    stage = None

    # Timing for audio triggers and error display
    last_alert_time = 0
    last_notinframe_time = 0
    alert_cooldown = 5  # seconds
    error_display_time = 3  # seconds

    # To keep track of when to stop displaying the error
    show_hands_too_high = False
    show_notinframe = False
    error_end_time_hands_too_high = 0
    error_end_time_notinframe = 0

    # Create a named window
    cv2.namedWindow('Bicep Curl Detection', cv2.WND_PROP_FULLSCREEN)
    cv2.setWindowProperty('Bicep Curl Detection', cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

    # Setup MediaPipe instance
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            frame = cv2.flip(frame, 1)
            if not ret:
                break

            # Recolor image to RGB
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False

            # Make detection
            results = pose.process(image)

            # Recolor back to BGR
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            current_time = time.time()

            # Check if landmarks are detected
            if results.pose_landmarks:
                # Extract landmarks
                try:
                    landmarks = results.pose_landmarks.landmark
                    
                    shoulder_l = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                    shoulder_r = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
                    elbow_l = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
                    elbow_r = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
                    wrist_l = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
                    wrist_r = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]
                    hip_l = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
                    hip_r = [landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y]

                    # Calculate angles for both arms
                    angle_l = calculate_angle(shoulder_l, elbow_l, wrist_l)
                    angle_r = calculate_angle(shoulder_r, elbow_r, wrist_r)
                    angle_l_e = calculate_angle(shoulder_l, elbow_l, wrist_l)
                    angle_r_e = calculate_angle(shoulder_r, elbow_r, wrist_r)
                    angle_l_h = calculate_angle(hip_l, shoulder_l, elbow_l)
                    angle_r_h = calculate_angle(hip_r, shoulder_r, elbow_r)

                    # Detect the curl position
                    if angle_l_e > 140 and angle_r_e > 140 and angle_l_h < 45 and angle_r_h < 45:
                        stage = "down"
                    if angle_l_e < 35 and angle_r_e < 35 and stage == 'down' and angle_l_h < 45 and angle_r_h < 45:
                        stage = "up"
                        counter += 1
                        print(counter)

                    # Detect incorrect form
                    hands_too_high = wrist_l[1] < shoulder_l[1] and wrist_r[1] < shoulder_r[1]

                except:
                    pass

                # Render bicep curl counter
                # Setup status box
                cv2.rectangle(image, (0, 0), (320, 83), (245, 117, 16), -1)

                # Reps data
                cv2.putText(image, 'REPS', (15, 12),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
                cv2.putText(image, str(counter),
                            (18, 70),
                            cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 255, 255), 2, cv2.LINE_AA)

                # Stage data
                cv2.putText(image, 'STAGE', (165, 12),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
                cv2.putText(image, stage,
                            (120, 70),
                            cv2.FONT_HERSHEY_SIMPLEX, 1.2, (255, 255, 255), 2, cv2.LINE_AA)
                
                # Incorrect form
                if hands_too_high and (current_time - last_alert_time > alert_cooldown):
                    show_hands_too_high = True
                    error_end_time_hands_too_high = current_time + error_display_time
                    cv2.rectangle(image, (0, 420), (640, 480), (0, 0, 255), -1)
                    cv2.putText(image, 'HANDS TOO HIGH', (240, 450), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2, cv2.LINE_AA)
                    # Play audio alert
                    threading.Thread(target=play_audio, args=(alert_sound,)).start()
                    last_alert_time = current_time

            else:
                # No landmarks detected
                if current_time - last_notinframe_time > alert_cooldown:
                    show_notinframe = True
                    error_end_time_notinframe = current_time + error_display_time
                    cv2.rectangle(image, (0, 420), (640, 480), (0, 0, 255), -1)
                    cv2.putText(image, 'NOT IN FRAME', (240, 450), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2, cv2.LINE_AA)
                    # Play "not in frame" audio alert
                    threading.Thread(target=play_audio, args=(notinframe_sound,)).start()
                    last_notinframe_time = current_time

            # Display error messages
            if show_hands_too_high:
                cv2.rectangle(image, (0, 420), (640, 480), (0, 0, 255), -1)
                cv2.putText(image, 'HANDS TOO HIGH', (240, 450), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2, cv2.LINE_AA)
                if current_time > error_end_time_hands_too_high:
                    show_hands_too_high = False

            if show_notinframe:
                cv2.rectangle(image, (0, 420), (640, 480), (0, 0, 255), -1)
                cv2.putText(image, 'NOT IN FRAME', (240, 450), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2, cv2.LINE_AA)
                if current_time > error_end_time_notinframe:
                    show_notinframe = False

            # Render detections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                       mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                                       mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2))

            cv2.imshow('Bicep Curl Detection', image)

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

    # Release resources
    cap.release()
    cv2.destroyAllWindows()

# Flask route for Bicep Curl Detection
@app.route('/bicep_curls', methods=['POST'])
def bicep_curls():
    threading.Thread(target=bicep_curl_detection).start()
    return jsonify({"status": "Bicep Curl Detection started"}), 200

def squats_detection():
    cap = cv2.VideoCapture(0)

    # Squat counter variables
    counter = 0
    stage = None

    # Timing for audio triggers
    last_play_time_legs_wide = 0
    last_play_time_joints_visible = 0
    alert_cooldown = 5  # seconds

    # Create a named window
    cv2.namedWindow('Squats Detection', cv2.WND_PROP_FULLSCREEN)
    cv2.setWindowProperty('Squats Detection', cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            frame = cv2.flip(frame, 1)
            if not ret:
                break

            # Recolor image to RGB
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False

            # Make detection
            results = pose.process(image)

            # Recolor back to BGR
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            # Extract landmarks
            try:
                landmarks = results.pose_landmarks.landmark
                
                # Get coordinates for hips, knees, and ankles
                hip_l = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
                knee_l = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
                ankle_l = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]
                shoulder_l = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                
                hip_r = [landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y]
                knee_r = [landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].y]
                ankle_r = [landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].y]
                shoulder_r = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
                
                # Calculate angles for squat
                angle_l = calculate_angle(hip_l, knee_l, ankle_l)
                angle_r = calculate_angle(hip_r, knee_r, ankle_r)

                shoulder_width = calculate_distance(shoulder_l, shoulder_r)
                feet_width = calculate_distance(ankle_l, ankle_r)

                required_joints_visible = all(coord is not None for coord in hip_l + ankle_l + knee_l + hip_r + ankle_r + knee_r)

                # Squat counter logic
                if angle_l < 100 and angle_r < 100:  # If both legs are bent (squatting)
                    if stage != "squatting":  # If not already in squatting stage
                        stage = "squatting"
                        counter += 1
                        print("Squat Count:", counter)
                else:  # If not squatting (standing)
                    if stage != "standing":  # If not already in standing stage
                        stage = "standing"

                legs_too_wide = feet_width > shoulder_width

            except:
                pass
            
            # Render squat counter
            # Setup status box
            cv2.rectangle(image, (0, 0), (320, 83), (245, 117, 16), -1)

            # Reps data
            cv2.putText(image, 'REPS', (15, 12),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
            cv2.putText(image, str(counter),
                        (18, 70),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 255, 255), 2, cv2.LINE_AA)

            # Stage data
            cv2.putText(image, 'STAGE', (165, 12),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
            cv2.putText(image, stage,
                        (120, 70),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.2, (255, 255, 255), 2, cv2.LINE_AA)
            
            # Incorrect form
            current_time = time.time()

            if required_joints_visible:
                if legs_too_wide and current_time - last_play_time_legs_wide > alert_cooldown:
                    cv2.rectangle(image, (0, 420), (640, 480), (0, 0, 255), -1)
                    cv2.putText(image, 'LEGS TOO WIDE', (240, 450), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2, cv2.LINE_AA)
                    threading.Thread(target=play_audio, args=(legs_wide_sound,)).start()
                    last_play_time_legs_wide = current_time
            else:
                if current_time - last_play_time_joints_visible > alert_cooldown:
                    cv2.rectangle(image, (0, 420), (640, 480), (0, 0, 255), -1)
                    cv2.putText(image, 'NOT IN FRAME', (240, 450), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2, cv2.LINE_AA)
                    threading.Thread(target=play_audio, args=(joints_visible,)).start()
                    last_play_time_joints_visible = current_time

            # Render detections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                                      mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2))

            cv2.imshow('Squats Detection', image)

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

    # Release resources
    cap.release()
    cv2.destroyAllWindows()

# Flask route for Squats Detection
@app.route('/squats', methods=['POST'])
def squats():
    threading.Thread(target=squats_detection).start()
    return jsonify({"status": "Squats Detection started"}), 200

# Flask Application Runner
if __name__ == "__main__":
    app.run(debug=True)


