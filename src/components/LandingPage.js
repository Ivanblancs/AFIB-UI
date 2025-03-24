// src/components/LandingPage.js
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import About from './About';
import Developers from './Developers';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('main'); // 'main', 'about', or 'developers'

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', // Soft blue gradient
        p: { xs: 2, sm: 4, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Main Container */}
      <Box
        sx={{
          maxWidth: '900px',
          width: '100%',
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 4,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
          p: 4,
        }}
      >
        {/* Navigation Links */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, gap: 3 }}>
          {activeSection !== 'main' && (
            <Button
              onClick={() => setActiveSection('main')}
              sx={{
                color: '#1976d2',
                fontWeight: 'medium',
                textTransform: 'none',
                fontSize: '1.1rem',
                '&:hover': { color: '#115293', textDecoration: 'underline' },
              }}
            >
              Back to Home
            </Button>
          )}
          {activeSection === 'main' && (
            <>
              <Button
                onClick={() => setActiveSection('about')}
                sx={{
                  color: '#1976d2',
                  fontWeight: 'medium',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  '&:hover': { color: '#115293', textDecoration: 'underline' },
                }}
              >
                About
              </Button>
              <Button
                onClick={() => setActiveSection('developers')}
                sx={{
                  color: '#1976d2',
                  fontWeight: 'medium',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  '&:hover': { color: '#115293', textDecoration: 'underline' },
                }}
              >
                Developers
              </Button>
            </>
          )}
        </Box>

        {/* Main Section (shown when activeSection is 'main') */}
        {activeSection === 'main' && (
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                color: '#1976d2',
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              Welcome to AFIB Detector
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#555',
                mb: 4,
                maxWidth: '700px',
                mx: 'auto',
                fontSize: { xs: '1rem', sm: '1.2rem' },
              }}
            >
              A tool to analyze your ECG data and detect Atrial Fibrillation with ease.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/app')}
              sx={{
                bgcolor: '#1976d2',
                '&:hover': { bgcolor: '#115293' },
                px: 5,
                py: 1.5,
                fontSize: '1.2rem',
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              Start ECG Analysis
            </Button>
          </Box>
        )}

        {/* About Section (shown when activeSection is 'about') */}
        {activeSection === 'about' && (
          <Box>
            <About />
          </Box>
        )}

        {/* Developers Section (shown when activeSection is 'developers') */}
        {activeSection === 'developers' && (
          <Box>
            <Developers />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default LandingPage;