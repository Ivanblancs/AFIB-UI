import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from '@mui/material';
import ecgChartImg from '../tutorial_images/tuts 1.png'; // Add your images
import resultImg from '../tutorial_images/tuts 2.png';
import uploadImg from '../tutorial_images/tuts 3.png';

function Tutorial({ onClose }) {
  const slides = [
    {
      image: ecgChartImg,
    },
    {
      image: resultImg,
    },
    {
      image: uploadImg,
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
        <Box
          sx={{
            textAlign: 'center',
            '& .imageContainer': {
              width: '100%',
              overflow: 'visible', // Ensures the scaled image isn’t clipped
              '&:hover, &:focus-within': { // Scales on hover or focus
                '& img': {
                  transform: 'scale(1.2)', // Scales image by 20%
                },
              },
            },
            '& img': {
              maxWidth: '100%',
              maxHeight: '400px',
              objectFit: 'contain',
              transition: 'transform 0.2s ease-in-out', // Smooth scaling transition
            },
          }}
        >
          <div tabIndex="0" className="imageContainer">
            <img
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
            />
          </div>
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