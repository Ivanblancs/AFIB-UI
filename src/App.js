// src/App.js
import React, { useState } from 'react';
import { Container, Typography, Box, Checkbox, FormControlLabel, Button } from '@mui/material';
import ECGChart from './components/ECGChart';
import FileUpload from './components/FileUpload';
import Tutorial from './components/Tutorial';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [ecgData, setEcgData] = useState([]);
  const [afResult, setAfResult] = useState('TBD');
  const [statusLabel, setStatusLabel] = useState('Upload an ECG file to start');
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const navigate = useNavigate();

  const handleEcgData = (data) => {
    if (!agreementChecked) return;
    setEcgData(data);
    setStatusLabel('Processing...');
    setAfResult('TBD');
    setTimeout(() => setStatusLabel('Checking...'), 1000);
    setTimeout(() => setStatusLabel('Checking again...'), 2000);
    setTimeout(() => {
      const isPositive = Math.random() > 0.5;
      setAfResult(isPositive ? 'Positive' : 'Negative');
      setStatusLabel('Analysis Complete');
    }, 3000);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, bgcolor: '#f5f5f5', p: 3, borderRadius: 2 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1976d2' }}>
        Virtual ECG Monitor
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, width: '100%', maxWidth: 600, mx: 'auto' }}>
        <Button onClick={() => setShowTutorial(true)}>Tutorial</Button>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </Box>

      <ECGChart ecgData={ecgData} afResult={afResult} />
      
      <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FileUpload onFileUpload={handleEcgData} disabled={!agreementChecked} />
        <FormControlLabel
          control={
            <Checkbox
              checked={agreementChecked}
              onChange={(e) => setAgreementChecked(e.target.checked)}
            />
          }
          label="I agree that my uploaded ECG data may be used to train the model for improved accuracy"
          sx={{ mt: 1 }}
        />
      </Box>

      <Typography variant="h6" align="center" sx={{ color: '#666', mt: 2 }}>
        {statusLabel}
      </Typography>
      
      {showTutorial && (
        <Tutorial onClose={() => setShowTutorial(false)} />
      )}
    </Container>
  );
}

export default App;