# 📊 MACHINE HEALTH DASHBOARD

It is a **real-time industrial sensor monitoring system** that visualizes temperature, pressure, and vibration data with live anomaly detection using **Socket.IO**, **React**, and **Recharts**.  
Built with a **professional Material Dark Theme** and fully responsive full-screen UI for industrial monitoring or AI/ML predictive maintenance systems.

---

## 🚀 Features

- 📡 **Live Data Streaming** – Real-time updates via Socket.IO.  
- 🌡️ **Dynamic Metrics Cards** – Temperature, Pressure, and Vibration displayed instantly.  
- 📈 **Beautiful Line Charts** – Responsive charts using Recharts with smooth transitions.  
- ⚠️ **Anomaly Detection Visualization** – Red highlights for anomaly points.  
- 🧠 **ML Model Integration** – Supports backend anomaly detection via Python (Isolation Forest / any model).  
- 🖥️ **Full-Screen Modern UI** – Centered graphs and Material dark theme layout.  
- 🧩 **Easy Integration** – Works with any IoT or ML-based backend.

---

## 🧠 Tech Stack

**Frontend**
- React.js  
- Recharts  
- Socket.IO Client  
- CSS3 (Material Dark Theme)

**Backend**
- Node.js  
- Express.js  
- Socket.IO  
- Python (For ML model)

---

---

## 🧩 Complete Setup Guide

Follow these steps to set up the full project on your system 👇

---

### 🔧 Prerequisites

Make sure you have these installed:

| Tool | Version |
|------|----------|
| Node.js | 18+ |
| npm | 9+ |
| Python | 3.9+ |
| Git | latest |

---

### 🗄️ 1. Clone the Repository

```
git clone https://github.com/paTRA9090/MACHINE-HEALTH-DASHBOARD.git
cd REALTIMEPREDICTION
```
### 🧩 2. Backend Setup (Node.js + Express)
```
cd server
npm install

```
### ▶️ 3.Start the backend server
```
node index.js
```
### 🤖 4.Python ML Model Setup
```
cd server/ml_model
python train_model.py

```
### 💻 5. Frontend Setup (React)
```
cd client
npm install

```
### ▶️ 6. Run the development server
```
npm run dev
```



