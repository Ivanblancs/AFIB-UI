import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  TimeScale,
  Title,
} from 'chart.js';
import { Paper, Box, Typography } from '@mui/material';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, TimeScale, Title);

function ECGChart({ ecgData, afResult }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null); // Ref for canvas DOM element
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mouseX, setMouseX] = useState(null);

  // Auto-scroll when not paused
  useEffect(() => {
    let interval;
    if (ecgData.length > 0 && !isPaused) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 10 >= ecgData.length ? 0 : prev + 10));
      }, 100); // ~10 fps
    }
    return () => clearInterval(interval);
  }, [ecgData, isPaused]);

  // Add mouse event listeners to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = () => {
      setIsPaused(true);
    };

    const handleMouseUp = () => {
      setIsPaused(false);
      setMouseX(null);
    };

    const handleMouseMove = (event) => {
      if (isPaused) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        setMouseX(x);

        const halfWidth = rect.width / 2;
        if (x < halfWidth) {
          setCurrentIndex((prev) => Math.max(0, prev - 10));
        } else if (x > halfWidth) {
          setCurrentIndex((prev) => Math.min(ecgData.length - 250, prev + 10));
        }
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ecgData, isPaused]);

  const chartData = {
    labels: Array.from({ length: 250 }, (_, i) => i / 250),
    datasets: [
      {
        label: 'ECG Signal (mV)',
        data: ecgData.length > 0 ? ecgData.slice(currentIndex, currentIndex + 250) : [],
        borderColor: '#00cc00',
        backgroundColor: 'rgba(0, 204, 0, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    animation: false,
    scales: {
      x: { type: 'linear', title: { display: true, text: 'Time (s)' }, min: 0, max: 1 },
      y: { title: { display: true, text: 'Voltage (mV)' }, min: -2, max: 2 },
    },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    maintainAspectRatio: false,
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ height: '400px' }}>
        {ecgData.length > 0 ? (
          <Line ref={(node) => {
            chartRef.current = node;
            canvasRef.current = node?.canvas; // Capture canvas DOM element
          }} data={chartData} options={chartOptions} />
        ) : (
          <Typography align="center" sx={{ pt: '180px' }}>
            Upload an ECG file to start
          </Typography>
        )}
      </Box>
      {ecgData.length > 0 && afResult !== 'TBD' && (
        <Typography
          variant="h6"
          align="center"
          sx={{
            color: afResult === 'Negative' ? '#00cc00' : '#d32f2f', // Green or Red
            mt: 1,
          }}
        >
          Result: {afResult}
        </Typography>
      )}
    </Paper>
  );
}

export default ECGChart;