import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import ECGChart from './components/ECGChart';
import FileUpload from './components/FileUpload';
import './App.css';

function App() {
  const [ecgData, setEcgData] = useState([]);
  const [afResult, setAfResult] = useState('TBD'); // 'Negative' or 'Positive'
  const [statusLabel, setStatusLabel] = useState('Upload an ECG file to start');

  const handleEcgData = (data) => {
    setEcgData(data);
    setStatusLabel('Processing...');
    setAfResult('TBD'); // Reset result during processing
    setTimeout(() => setStatusLabel('Checking...'), 1000);
    setTimeout(() => setStatusLabel('Checking again...'), 2000);
    setTimeout(() => {
      // Mock AF detection (replace with FFT-CNN later)
      const isPositive = Math.random() > 0.5; // 50% chance for demo
      setAfResult(isPositive ? 'Positive' : 'Negative');
      setStatusLabel('Analysis Complete');
    }, 3000);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, bgcolor: '#f5f5f5', p: 3, borderRadius: 2 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1976d2' }}>
        Virtual ECG Monitor
      </Typography>
      <ECGChart ecgData={ecgData} afResult={afResult} />
      <FileUpload onFileUpload={handleEcgData} />
      <Typography variant="h6" align="center" sx={{ color: '#666', mt: 2 }}>
        {statusLabel}
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: '#888', mt: 1 }}>
        Prototype: Upload an ECG file to see it play. AF result to be integrated later.
      </Typography>
    </Container>
  );
}

export default App;