import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot
} from 'recharts';
import './App.css';

// Keep your backend connection unchanged
const socket = io('http://localhost:4000');

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleNewData = (newData) => {
      const formattedData = {
        timestamp: new Date(newData.timestamp).toLocaleTimeString(),
        temp: newData.features[0],
        pressure: newData.features[1],
        vibration: newData.features[2],
        anomaly: newData.anomaly,
        fullTimestamp: newData.timestamp,
      };
      setData(prev => [...prev, formattedData].slice(-50));
    };

    socket.on('new_sensor_data', handleNewData);
    return () => socket.off('new_sensor_data', handleNewData);
  }, []);

  const renderAnomalyDots = (dataKey) =>
    data.map((point, index) =>
      point.anomaly === -1 ? (
        <ReferenceDot
          key={`dot-${index}`}
          x={point.timestamp}
          y={point[dataKey]}
          r={6}
          fill="#ef4444"
          stroke="none"
        />
      ) : null
    );

  const latestData = data[data.length - 1] || {};
  const isAnomaly = latestData.anomaly === -1;

  const tooltipStyle = {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '6px'
  };
  const itemStyle = { color: '#e2e8f0' };
  const labelStyle = { color: '#f1f5f9' };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Machine Health Dashboard</h1>
        <p>Real-time Monitoring System</p>
      </header>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className={`stat-card ${isAnomaly ? 'anomaly' : ''}`}>
          <h3>Temperature</h3>
          <p className="stat-value">{latestData.temp ? latestData.temp.toFixed(2) : '---'} °C</p>
        </div>
        <div className={`stat-card ${isAnomaly ? 'anomaly' : ''}`}>
          <h3>Pressure</h3>
          <p className="stat-value">{latestData.pressure ? latestData.pressure.toFixed(2) : '---'} kPa</p>
        </div>
        <div className={`stat-card ${isAnomaly ? 'anomaly' : ''}`}>
          <h3>Vibration</h3>
          <p className="stat-value">{latestData.vibration ? latestData.vibration.toFixed(2) : '---'} mm/s</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-container">
          <h2>Temperature Sensor (°C)</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="timestamp" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={tooltipStyle} itemStyle={itemStyle} labelStyle={labelStyle} />
              <Legend wrapperStyle={{ color: '#e2e8f0' }} />
              <Line type="monotone" dataKey="temp" stroke="#3b82f6" dot={false} isAnimationActive={false} />
              {renderAnomalyDots('temp')}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h2>Pressure Sensor (kPa)</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="timestamp" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={tooltipStyle} itemStyle={itemStyle} labelStyle={labelStyle} />
              <Legend wrapperStyle={{ color: '#e2e8f0' }} />
              <Line type="monotone" dataKey="pressure" stroke="#10b981" dot={false} isAnimationActive={false} />
              {renderAnomalyDots('pressure')}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container vibration-chart">
          <h2>Vibration Sensor (mm/s)</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="timestamp" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={tooltipStyle} itemStyle={itemStyle} labelStyle={labelStyle} />
              <Legend wrapperStyle={{ color: '#e2e8f0' }} />
              <Line type="monotone" dataKey="vibration" stroke="#f59e0b" dot={false} isAnimationActive={false} />
              {renderAnomalyDots('vibration')}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
