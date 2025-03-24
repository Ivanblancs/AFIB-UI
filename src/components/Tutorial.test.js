import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tutorial from './Tutorial';

describe('Tutorial Component Outputs', () => {
  const onClose = jest.fn();

  test('displays first slide content on open', () => {
    render(<Tutorial onClose={onClose} />);
    expect(screen.getByText('Tutorial')).toBeInTheDocument();
    expect(screen.getByAltText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('ECG Chart: Displays your ECG signal in real-time. Click and drag to pause and scroll.')).toBeInTheDocument();
  });

  test('displays correct slide content after navigation', () => {
    render(<Tutorial onClose={onClose} />);
    expect(screen.getByAltText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('ECG Chart: Displays your ECG signal in real-time. Click and drag to pause and scroll.')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByAltText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Result: Shows if you’re AFIB positive (Irregular) or negative (Regular) after analysis.')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByAltText('Slide 3')).toBeInTheDocument();
    expect(screen.getByText('Upload Section: Upload your ECG file here (.csv or .dat format). Check the agreement to enable.')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByAltText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Result: Shows if you’re AFIB positive (Irregular) or negative (Regular) after analysis.')).toBeInTheDocument();
  });

  test('displays Next button as disabled on the last slide', () => {
    render(<Tutorial onClose={onClose} />);
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Next')).toBeDisabled();
  });

  test('displays Previous button as disabled on the first slide', () => {
    render(<Tutorial onClose={onClose} />);
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  test('triggers onClose when Close button is clicked', () => {
    render(<Tutorial onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});