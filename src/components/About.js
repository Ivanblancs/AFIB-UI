import React from 'react';
import { Typography, Box } from '@mui/material';

function About() {
  return (
    <Box id="about" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom>About Virtual ECG Monitor</Typography>
      <Typography variant="body1" paragraph>
        This is a prototype ECG analysis tool designed to detect Atrial Fibrillation (AFIB) from uploaded ECG recordings.
      </Typography>
      <Typography variant="body1" paragraph>
        How it works:
        1. Upload your ECG file in .csv or .dat format
        2. The system processes the signal using a mock algorithm (to be replaced with FFT-CNN)
        3. Displays the ECG waveform in real-time
        4. Provides an AFIB detection result
      </Typography>
      <Typography variant="body1" paragraph>
        The current algorithm uses random detection for demonstration. Future versions will implement:
        - Fast Fourier Transform (FFT) for frequency analysis
        - Convolutional Neural Network (CNN) for pattern recognition
        - Real-time signal processing
      </Typography>
    </Box>
  );
}

export default About;