// src/components/About.js
import React from 'react';
import { Typography, Box } from '@mui/material';

function About() {
  return (
    <Box id="about">
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ color: '#1976d2', fontWeight: 'bold', mb: 4 }}
      >
        About Virtual ECG Monitor
      </Typography>

      {/* Overview */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: '#333', fontWeight: 'medium', mb: 2 }}
      >
        Overview
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ color: '#444', lineHeight: 1.8, mb: 4 }}
      >
        The Virtual ECG Monitor is an innovative prototype designed to assist in the early detection of Atrial Fibrillation (AFIB), a common heart rhythm disorder that can lead to serious complications such as stroke and heart failure if left untreated. By leveraging advanced signal processing techniques, this tool analyzes uploaded ECG recordings to provide users with real-time insights into their heart health. Our mission is to empower individuals and healthcare professionals with accessible, reliable, and user-friendly technology to monitor and manage cardiovascular conditions effectively.
      </Typography>

      {/* Purpose and Benefits */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: '#333', fontWeight: 'medium', mb: 2 }}
      >
        Purpose and Benefits
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ color: '#444', lineHeight: 1.8, mb: 4 }}
      >
        Atrial Fibrillation affects millions of people worldwide, often going undiagnosed due to its intermittent nature. The Virtual ECG Monitor aims to bridge this gap by offering a convenient solution for preliminary AFIB screening. Key benefits include:
      </Typography>
      <Box sx={{ pl: 3, mb: 4 }}>
        <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8 }}>
          <ul>
            <li><strong>Accessibility:</strong> Analyze ECG data from the comfort of your home using common file formats (.csv or .dat).</li>
            <li><strong>Real-Time Visualization:</strong> View your ECG waveform as it’s processed, enabling immediate feedback.</li>
            <li><strong>Early Detection:</strong> Identify potential AFIB episodes early, prompting timely medical consultation.</li>
            <li><strong>User-Friendly Interface:</strong> Designed with simplicity in mind, making it easy for non-experts to use.</li>
          </ul>
        </Typography>
      </Box>

      {/* How It Works */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: '#333', fontWeight: 'medium', mb: 2 }}
      >
        How It Works
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ color: '#444', lineHeight: 1.8, mb: 2 }}
      >
        The Virtual ECG Monitor follows a straightforward process to analyze your ECG data:
      </Typography>
      <Box sx={{ pl: 3, mb: 4 }}>
        <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8 }}>
          <ol>
            <li><strong>Upload Your ECG File:</strong> Support for .csv and .dat formats ensures compatibility with most ECG devices.</li>
            <li><strong>Signal Processing:</strong> The system processes your ECG data using a mock algorithm (currently for demonstration purposes).</li>
            <li><strong>Real-Time Waveform Display:</strong> Visualize your ECG signal as a dynamic graph, with interactive controls to pause and scroll.</li>
            <li><strong>AFIB Detection Result:</strong> Receive a preliminary result indicating whether AFIB is detected (positive/negative).</li>
          </ol>
        </Typography>
      </Box>

      {/* Current Technology */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: '#333', fontWeight: 'medium', mb: 2 }}
      >
        Current Technology
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ color: '#444', lineHeight: 1.8, mb: 4 }}
      >
        At this prototype stage, the Virtual ECG Monitor uses a simplified algorithm that provides random detection results for demonstration purposes. This allows us to test the user interface and workflow while developing the core technology. The system is built using React for the frontend, with Material-UI for a polished and responsive design, ensuring a seamless experience across devices.
      </Typography>

      {/* Future Enhancements */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: '#333', fontWeight: 'medium', mb: 2 }}
      >
        Future Enhancements
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ color: '#444', lineHeight: 1.8, mb: 2 }}
      >
        We are actively working on enhancing the Virtual ECG Monitor to provide accurate and reliable AFIB detection. Future versions will incorporate the following advanced technologies:
      </Typography>
      <Box sx={{ pl: 3, mb: 4 }}>
        <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8 }}>
          <ul>
            <li><strong>Fast Fourier Transform (FFT):</strong> For frequency domain analysis to identify irregular heart rhythms characteristic of AFIB.</li>
            <li><strong>Convolutional Neural Network (CNN):</strong> To improve pattern recognition and accurately classify ECG signals as normal or indicative of AFIB.</li>
            <li><strong>Real-Time Signal Processing:</strong> Enabling continuous monitoring and immediate feedback for live ECG data streams.</li>
            <li><strong>Cloud Integration:</strong> To store and analyze ECG data securely, allowing users to track their heart health over time.</li>
            <li><strong>Integration with Wearables:</strong> Support for direct data input from smartwatches and other wearable devices that capture ECG data.</li>
          </ul>
        </Typography>
      </Box>

      {/* Disclaimer */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: '#333', fontWeight: 'medium', mb: 2 }}
      >
        Disclaimer
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ color: '#444', lineHeight: 1.8 }}
      >
        The Virtual ECG Monitor is currently a prototype and should not be used for medical diagnosis or treatment decisions. Always consult a healthcare professional for an accurate diagnosis and medical advice. The results provided by this tool are for informational purposes only and are not a substitute for professional medical evaluation.
      </Typography>
    </Box>
  );
}

export default About;