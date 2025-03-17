// src/components/ECGChart.js
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
import {
  Paper,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // For positive result
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // For negative result

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, TimeScale, Title);

function ECGChart({ ecgData, afResult }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mouseX, setMouseX] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Controls popup visibility
  const [popupType, setPopupType] = useState(''); // Tracks 'positive' or 'negative'

  // Auto-scroll when not paused
  useEffect(() => {
    let interval;
    if (ecgData.length > 0 && !isPaused) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 10 >= ecgData.length ? 0 : prev + 10));
      }, 100);
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

  // Trigger popup based on afResult
  useEffect(() => {
    if (afResult === 'Positive') {
      setShowPopup(true);
      setPopupType('positive');
    } else if (afResult === 'Negative') {
      setShowPopup(true);
      setPopupType('negative');
    } else {
      setShowPopup(false);
    }
  }, [afResult]);

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
          <Line
            ref={(node) => {
              chartRef.current = node;
              canvasRef.current = node?.canvas;
            }}
            data={chartData}
            options={chartOptions}
          />
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
            color: afResult === 'Negative' ? '#00cc00' : '#d32f2f',
            mt: 1,
          }}
        >
          Result: {afResult}
        </Typography>
      )}

      {/* Popup for Positive or Negative Result */}
      <Dialog
        open={showPopup}
        onClose={() => setShowPopup(false)}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
            maxWidth: '600px',
            width: '100%',
            bgcolor: '#fff',
            animation: 'fadeIn 0.3s ease-in-out',
          },
        }}
      >
        {popupType === 'positive' && (
          <>
            <DialogTitle
              sx={{
                bgcolor: '#ff6f61',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                py: 2,
                px: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
              }}
            >
              <WarningAmberIcon sx={{ fontSize: '2rem' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Positive AFIB Detection
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ py: 3, px: 4 }}>
              <Typography
                variant="body1"
                paragraph
                sx={{ color: '#333', lineHeight: 1.6, mb: 3 }}
              >
                The analysis of your ECG data indicates a positive result for Atrial Fibrillation (AFIB). This suggests an irregular heart rhythm that may require medical attention.
              </Typography>
              <Box
                sx={{
                  bgcolor: 'rgba(255, 245, 245, 0.8)',
                  p: 2,
                  borderRadius: 2,
                  mb: 3,
                  borderLeft: '4px solid #ff6f61',
                }}
              >
                <Typography variant="h6" sx={{ color: '#333', mb: 1.5, fontWeight: 'medium' }}>
                  Diagnostic Information
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.8 }}>
                  <ul style={{ paddingLeft: '20px' }}>
                    <li>
                      <strong>Condition:</strong> Atrial Fibrillation (AFIB) - an irregular and often rapid heart rate.
                    </li>
                    <li>
                      <strong>Possible Symptoms:</strong> Palpitations, fatigue, shortness of breath, or dizziness.
                    </li>
                    <li>
                      <strong>Next Steps:</strong> Consult a healthcare professional for a comprehensive evaluation, which may include an electrocardiogram (ECG), blood tests, or an echocardiogram.
                    </li>
                    <li>
                      <strong>Risk Factors:</strong> High blood pressure, heart disease, thyroid issues, or excessive alcohol consumption may contribute.
                    </li>
                  </ul>
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: '#666', fontStyle: 'italic', textAlign: 'center' }}
              >
                Note: This is a prototype tool and not a substitute for professional medical diagnosis. Please seek medical advice promptly.
              </Typography>
            </DialogContent>
          </>
        )}

        {popupType === 'negative' && (
          <>
            <DialogTitle
              sx={{
                bgcolor: '#4caf50', // Green for negative result
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                py: 2,
                px: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
              }}
            >
              <CheckCircleIcon sx={{ fontSize: '2rem' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Negative AFIB Detection
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ py: 3, px: 4 }}>
              <Typography
                variant="body1"
                paragraph
                sx={{ color: '#333', lineHeight: 1.6, mb: 3 }}
              >
                Congratulations! The analysis of your ECG data indicates a negative result for Atrial Fibrillation (AFIB). Your heart rhythm appears normal based on this preliminary assessment.
              </Typography>
              <Box
                sx={{
                  bgcolor: 'rgba(240, 255, 240, 0.8)', // Light green background
                  p: 2,
                  borderRadius: 2,
                  mb: 3,
                  borderLeft: '4px solid #4caf50', // Green accent
                }}
              >
                <Typography variant="h6" sx={{ color: '#333', mb: 1.5, fontWeight: 'medium' }}>
                  Health Advice to Prevent AFIB
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.8 }}>
                  <ul style={{ paddingLeft: '20px' }}>
                    <li>
                      <strong>Maintain a Healthy Diet:</strong> Eat a balanced diet rich in fruits, vegetables, whole grains, and lean proteins to support heart health.
                    </li>
                    <li>
                      <strong>Exercise Regularly:</strong> Aim for at least 150 minutes of moderate aerobic activity per week, such as walking or swimming.
                    </li>
                    <li>
                      <strong>Manage Stress:</strong> Practice relaxation techniques like meditation or yoga to reduce stress, which can affect heart rhythm.
                    </li>
                    <li>
                      <strong>Limit Alcohol and Caffeine:</strong> Reduce intake to avoid triggering irregular heartbeats.
                    </li>
                    <li>
                      <strong>Monitor Blood Pressure:</strong> Keep it under control with regular check-ups and a healthy lifestyle.
                    </li>
                  </ul>
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: '#666', fontStyle: 'italic', textAlign: 'center' }}
              >
                Note: This is a prototype tool. For ongoing heart health, consult a healthcare professional periodically.
              </Typography>
            </DialogContent>
          </>
        )}

        <DialogActions
          sx={{
            py: 2,
            px: 3,
            bgcolor: '#f5f5f5',
            borderBottomLeftRadius: 3,
            borderBottomRightRadius: 3,
          }}
        >
          <Button
            onClick={() => setShowPopup(false)}
            variant="contained"
            sx={{
              bgcolor: popupType === 'positive' ? '#1976d2' : '#4caf50', // Blue for positive, green for negative
              '&:hover': { bgcolor: popupType === 'positive' ? '#115293' : '#45a049', transform: 'scale(1.05)' },
              px: 4,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              transition: 'all 0.2s ease-in-out',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* CSS for Fade-In Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Paper>
  );
}

export default ECGChart;