import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextToPdfForm } from './TextToPdfForm';

describe('TextToPdfForm', () => {
  it('calls onConvert with the entered text when the button is clicked', () => {
    const onConvertMock = jest.fn();
    render(<TextToPdfForm onConvert={onConvertMock} />);

    const textarea = screen.getByPlaceholderText(
      /Введіть текст для конвертації/i
    );
    fireEvent.change(textarea, { target: { value: 'Test PDF text' } });

    const button = screen.getByText(/Конвертувати в PDF/i);
    fireEvent.click(button);

    expect(onConvertMock).toHaveBeenCalledTimes(1);
    expect(onConvertMock).toHaveBeenCalledWith('Test PDF text');
  });

  it('shows an alert if the textarea is empty', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const onConvertMock = jest.fn();
    render(<TextToPdfForm onConvert={onConvertMock} />);

    const button = screen.getByText(/Конвертувати в PDF/i);
    fireEvent.click(button);

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(onConvertMock).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });
});
