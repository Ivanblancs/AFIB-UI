import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import developer1 from '../developer_images/developer1.png';
import developer2 from '../developer_images/developer2.png';
import developer3 from '../developer_images/developer3.png';

function Developers() {
  const developers = [
    { name: "Christian Ivan Blanca", role: "Lead Researcher and Developer", image: developer1 },
    { name: "Kent Bryan Ode", role: "Co Developer and Researcher", image: developer2 },
    { name: "Karl Castillejos", role: "Project Manager", image: developer3 },
  ];

  return (
    <Box id="developers" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>Our Team</Typography>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexWrap: 'wrap',
        gap: 4,
        maxWidth: 800,
        mx: 'auto'
      }}>
        {developers.map((dev) => (
          <Box 
            key={dev.name} 
            sx={{ 
              textAlign: 'center', 
              m: 2,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
                zIndex: 1
              }
            }}
          >
            <Avatar
              src={dev.image}
              alt={dev.name}
              sx={{ 
                width: 100, 
                height: 100, 
                mb: 1,
                mx: 'auto',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  width: 150,
                  height: 150
                }
              }}
            />
            <Typography variant="h6">{dev.name}</Typography>
            <Typography variant="body2" color="text.secondary">{dev.role}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Developers;
