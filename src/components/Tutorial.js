// src/components/Tutorial.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from '@mui/material';
import ecgChartImg from '../tutorial_images/ecg_chart.png'; // Add your images
import resultImg from '../tutorial_images/result.png';
import uploadImg from '../tutorial_images/upload.png';

function Tutorial({ onClose }) {
  const slides = [
    {
      image: ecgChartImg,
      label: 'ECG Chart: Displays your ECG signal in real-time. Click and drag to pause and scroll.',
    },
    {
      image: resultImg,
      label: 'Result: Shows if you’re AFIB positive (Irregular) or negative (Regular) after analysis.',
    },
    {
      image: uploadImg,
      label: 'Upload Section: Upload your ECG file here (.csv or .dat format). Check the agreement to enable.',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Tutorial</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center' }}>
          <img
            src={slides[currentSlide].image}
            alt={`Slide ${currentSlide + 1}`}
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
          />
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
            {slides[currentSlide].label}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              variant="outlined"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentSlide === slides.length - 1}
              variant="outlined"
            >
              Next
            </Button>
            <Button onClick={onClose} variant="contained">
              Close
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default Tutorial;