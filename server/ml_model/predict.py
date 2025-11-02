import sys
import json
import joblib

# Load the pre-trained model
model = joblib.load('ml_model/anomaly_model.joblib')

# Read JSON data from Node.js stdin
input_data = json.loads(sys.stdin.read()) # e.g., {'features': [25, 101, 12]}

# Make prediction (must be a 2D array)
prediction = model.predict([input_data['features']])

# Send result back to Node.js stdout
# -1 = anomaly, 1 = normal
result = {'anomaly': int(prediction[0])}
print(json.dumps(result))