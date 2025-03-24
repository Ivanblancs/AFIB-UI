import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileUpload from './FileUpload';

describe('FileUpload Component Outputs', () => {
  const onFileUpload = jest.fn();

  test('displays disabled button when disabled prop is true', () => {
    render(<FileUpload onFileUpload={onFileUpload} disabled={true} />);
    const button = screen.getByRole('button', { name: /upload ecg file/i });
    expect(button).toBeDisabled();
  });

  test('outputs correct data for CSV file upload', () => {
    render(<FileUpload onFileUpload={onFileUpload} disabled={false} />);
    const input = screen.getByLabelText(/upload/i);
    const file = new File(['\n1\n2\n3'], 'test.csv', { type: 'text/csv' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(onFileUpload).toHaveBeenCalledWith([1, 2, 3]);
  });

  test('outputs mock data for DAT file upload', () => {
    render(<FileUpload onFileUpload={onFileUpload} disabled={false} />);
    const input = screen.getByLabelText(/upload/i);
    const file = new File(['dummy content'], 'test.dat', { type: 'application/octet-stream' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(onFileUpload).toHaveBeenCalled();
    const mockData = onFileUpload.mock.calls[0][0];
    expect(mockData).toHaveLength(1250);
    expect(mockData.every(val => typeof val === 'number')).toBe(true);
  });

  test('outputs error message for unsupported file type', () => {
    render(<FileUpload onFileUpload={onFileUpload} disabled={false} />);
    const input = screen.getByLabelText(/upload/i);
    const file = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(console.error).toHaveBeenCalledWith('Unsupported file type. Please upload .csv or .dat');
    expect(onFileUpload).not.toHaveBeenCalled();
  });

  test('outputs error message for invalid CSV format', () => {
    render(<FileUpload onFileUpload={onFileUpload} disabled={false} />);
    const input = screen.getByLabelText(/upload/i);
    const file = new File(['\ninvalid\ntext'], 'test.csv', { type: 'text/csv' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(console.error).toHaveBeenCalledWith('Invalid CSV format');
    expect(onFileUpload).not.toHaveBeenCalled();
  });
});