import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest

df = pd.read_csv('sensor_data.csv')
features = ['temperature', 'pressure', 'vibration']

model = IsolationForest(contamination=0.05)
model.fit(df[features])

joblib.dump(model, 'anomaly_model.joblib')
print("Model saved to anomaly_model.joblib")