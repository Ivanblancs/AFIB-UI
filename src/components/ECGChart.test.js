import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ECGChart from './ECGChart';

describe('ECGChart Component Outputs', () => {
  test('displays placeholder text when no data is uploaded', () => {
    render(<ECGChart ecgData={[]} afResult="TBD" />);
    expect(screen.getByText('Upload an ECG file to start')).toBeInTheDocument();
  });

  test('hides placeholder text when data is provided', () => {
    render(<ECGChart ecgData={[1, 2, 3, 4, 5]} afResult="TBD" />);
    expect(screen.queryByText('Upload an ECG file to start')).not.toBeInTheDocument();
  });

  test('shows popup with correct content for positive AFIB result', async () => {
    render(<ECGChart ecgData={[1, 2, 3]} afResult="Positive" />);
    await waitFor(
      () => {
        expect(screen.getByText('Positive AFIB Detection')).toBeInTheDocument();
        expect(screen.getByText(/The analysis of your ECG data indicates a positive result/)).toBeInTheDocument();
        // Verify diagnostic information
        expect(screen.getByText(/Condition: Atrial Fibrillation \(AFIB\)/)).toBeInTheDocument();
        expect(screen.getByText(/Possible Symptoms: Palpitations, fatigue/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test('shows popup with correct content for negative AFIB result', async () => {
    render(<ECGChart ecgData={[1, 2, 3]} afResult="Negative" />);
    await waitFor(
      () => {
        expect(screen.getByText('Negative AFIB Detection')).toBeInTheDocument();
        expect(screen.getByText(/Congratulations! The analysis of your ECG data indicates a negative result/)).toBeInTheDocument();
        // Verify health advice
        expect(screen.getByText(/Maintain a Healthy Diet:/)).toBeInTheDocument();
        expect(screen.getByText(/Exercise Regularly:/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test('hides popup after Close button is clicked', async () => {
    render(<ECGChart ecgData={[1, 2, 3]} afResult="Positive" />);
    await waitFor(
      () => {
        expect(screen.getByText('Positive AFIB Detection')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    fireEvent.click(screen.getByText('Close'));
    await waitFor(
      () => {
        expect(screen.queryByText('Positive AFIB Detection')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});