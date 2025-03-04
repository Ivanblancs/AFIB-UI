import React from 'react';
import { Typography, Box } from '@mui/material';

function AFResult({ result, statusLabel }) {
  const isAlert = statusLabel.includes('Alert');

  // Determine color based on result
  const resultColor = {
    'TBD': '#666',         // Gray for TBD
    'Regular': '#00cc00',  // Green for regular
    'Irregular': '#d32f2f' // Red for irregular
  }[result] || '#666';     // Default to gray if undefined

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography
        variant="h6"
        sx={{ color: resultColor }}
      >
        AF Detection: {result}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: isAlert ? '#d32f2f' : '#666',
          fontWeight: isAlert ? 'bold' : 'normal',
        }}
      >
        {statusLabel}
      </Typography>
    </Box>
  );
}

export default AFResult;