import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';

function Tutorial({ onClose }) {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Tutorial</DialogTitle>
      <DialogContent>
        <Typography variant="h6" sx={{ mb: 2, backgroundColor: '#e3f2fd', p: 1 }}>
          ECG Chart
          <Typography variant="body1">
            This chart displays your ECG signal in real-time. Click and drag to pause and scroll through the data.
          </Typography>
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, backgroundColor: '#e3f2fd', p: 1 }}>
          Result
          <Typography variant="body1">
            Shows if you're AFIB positive (Irregular) or negative (Regular) after analysis.
          </Typography>
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, backgroundColor: '#e3f2fd', p: 1 }}>
          Upload Section
          <Typography variant="body1">
            Upload your ECG file here (.csv or .dat format). Check the agreement to enable uploading.
          </Typography>
        </Typography>

        <Button onClick={onClose} variant="contained" sx={{ mt: 2 }}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default Tutorial;