import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HistoryList } from './HistoryList';

describe('HistoryList', () => {
  const mockHistory = [
    { id: 1, text: 'First PDF', base64: 'fake-base64-1' },
    { id: 2, text: 'Second PDF', base64: 'fake-base64-2' },
  ];

  it('renders empty state when history is empty', () => {
    render(<HistoryList history={[]} onOpenPdf={jest.fn()} />);
    expect(screen.getByText(/Поки що немає конвертацій/i)).toBeInTheDocument();
  });

  it('renders history items correctly', () => {
    render(<HistoryList history={mockHistory} onOpenPdf={jest.fn()} />);

    expect(screen.getByText('First PDF')).toBeInTheDocument();
    expect(screen.getByText('Second PDF')).toBeInTheDocument();
  });

  it('calls onOpenPdf with correct base64 when user clicks "Відкрити PDF"', () => {
    const onOpenPdfMock = jest.fn();
    render(<HistoryList history={mockHistory} onOpenPdf={onOpenPdfMock} />);

    const openButtons = screen.getAllByRole('button', {
      name: /Відкрити PDF/i,
    });

    fireEvent.click(openButtons[0]);

    expect(onOpenPdfMock).toHaveBeenCalledTimes(1);
    expect(onOpenPdfMock).toHaveBeenCalledWith('fake-base64-1');
  });
});
