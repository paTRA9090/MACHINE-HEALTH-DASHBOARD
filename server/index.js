const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000", // old frontend port
      "http://localhost:5173"  // Vite or React app port
    ],
    methods: ["GET", "POST"]
  }
});

const PORT = 4000;

// ------------------------ Sensor Data Simulation ------------------------
function generateSensorData() {
  const temp = parseFloat((Math.random() * 5 + 20).toFixed(2));       // 20–25°C
  const pressure = parseFloat((Math.random() * 10 + 100).toFixed(2)); // 100–110
  const vibration = parseFloat((Math.random() * 2 + 10).toFixed(2));  // 10–12

  // 10% anomaly chance
  if (Math.random() < 0.1) {
    const anomalyType = Math.floor(Math.random() * 3);
    if (anomalyType === 0) return { features: [temp + 50, pressure, vibration] };   // High temp
    if (anomalyType === 1) return { features: [temp, pressure + 50, vibration] };   // High pressure
    return { features: [temp, pressure, vibration + 20] };                           // High vibration
  }

  return { features: [temp, pressure, vibration] };
}

// ------------------------ Socket.IO Connection ------------------------
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // Choose correct Python command
  const pythonCmd = process.platform === 'win32' ? 'py' : 'python';

  // Start interval for sensor data
  const interval = setInterval(() => {
    const data = generateSensorData();

    // Define path to Python script
    const scriptPath = path.join(__dirname, 'ml_model', 'predict.py');

    // Spawn Python process
    const pythonProcess = spawn(pythonCmd, [scriptPath]);

    // Send data to Python script
    pythonProcess.stdin.write(JSON.stringify(data));
    pythonProcess.stdin.end();

    // Handle Python output
    pythonProcess.stdout.on('data', (py_result) => {
      try {
        const result = JSON.parse(py_result.toString()); // e.g., { anomaly: -1 }
        const timestamp = new Date().toISOString();

        const full_data = {
          features: data.features,
          anomaly: result.anomaly,
          error: result.error,
          timestamp
        };

        io.emit('new_sensor_data', full_data);
      } catch (e) {
        console.error('Error parsing Python output:', e);
      }
    });

    // Handle Python errors
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
    });

  }, 2000); // Every 2 seconds

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    clearInterval(interval);
  });
});

server.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
