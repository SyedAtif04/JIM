import cv2
import time
import pygame
import mediapipe as mp
import numpy as np
from flask import Flask, request, jsonify
import threading

app = Flask(__name__)

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

# Initialize pygame
pygame.init()
pygame.mixer.init()

# Load audio files
legs_wide_sound = pygame.mixer.Sound("src\\Python\\static\\audio\\legs too wide.mp3")
joints_visible_sound = pygame.mixer.Sound("src\\Python\\static\\audio\\notinframe.mp3")

# Function to calculate distance between two points
def calculate_distance(a, b):
    a = np.array(a)
    b = np.array(b)
    return np.linalg.norm(a - b)

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

# Function to play audio alerts
def play_audio(sound):
    sound.play()

# Squats detection logic encapsulated in a function
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
                    threading.Thread(target=play_audio, args=(joints_visible_sound,)).start()
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
