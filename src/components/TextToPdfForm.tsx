import React, { useState } from 'react';

interface TextToPdfFormProps {
  onConvert: (text: string) => Promise<void>;
}

export const TextToPdfForm = ({ onConvert }: TextToPdfFormProps) => {
  const [text, setText] = useState('');

  const handleConvert = async () => {
    if (!text.trim()) {
      alert('Будь ласка, введіть текст для конвертації!');
      return;
    }
    await onConvert(text);
  };

  return (
    <div className="mb-6">
      <textarea
        placeholder="Введіть текст для конвертації..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-md border p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        rows={5}
      ></textarea>
      <button
        onClick={handleConvert}
        className="mt-4 rounded-md bg-blue-500 px-6 py-2 text-white shadow hover:bg-blue-600"
      >
        Конвертувати в PDF
      </button>
    </div>
  );
};
