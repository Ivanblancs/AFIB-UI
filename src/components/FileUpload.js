import React from 'react';
import { Button } from '@mui/material';

function FileUpload({ onFileUpload, disabled }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExt = file.name.split('.').pop().toLowerCase();
      
      if (fileExt === 'csv') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target.result;
          const data = text
            .split('\n')
            .slice(1)
            .map((line) => parseFloat(line.trim()))
            .filter((val) => !isNaN(val));
          if (data.length > 0) {
            onFileUpload(data.slice(0, 1250));
          } else {
            console.error('Invalid CSV format');
          }
        };
        reader.readAsText(file);
      } else if (fileExt === 'dat') {
        console.warn('.dat files require backend processing. Using mock data for now.');
        const mockData = Array.from({ length: 1250 }, () => Math.random() * 2 - 1);
        onFileUpload(mockData);
      } else {
        console.error('Unsupported file type. Please upload .csv or .dat');
      }
    }
  };

  return (
    <Button
      variant="contained"
      component="label"
      disabled={disabled}
      sx={{ 
        bgcolor: '#1976d2', 
        '&:hover': { bgcolor: '#115293' }, 
        mb: 2,
        opacity: disabled ? 0.6 : 1
      }}
    >
      Upload ECG File
      <input
        type="file"
        hidden
        onChange={handleFileChange}
        accept=".csv,.dat,.hea,.atr"
      />
    </Button>
  );
}

export default FileUpload;