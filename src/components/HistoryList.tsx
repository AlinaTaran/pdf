import React from 'react';

interface HistoryItem {
  id: number;
  text: string;
  base64: string;
}

interface HistoryListProps {
  history: HistoryItem[];
  onOpenPdf: (base64: string) => void;
}

export const HistoryList = ({ history, onOpenPdf }: HistoryListProps) => {
  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Історія Конвертацій</h2>
      {history.length === 0 ? (
        <p className="text-gray-600">Поки що немає конвертацій.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-md border bg-white p-3 shadow-sm"
            >
              <span className="text-gray-800">{item.text}</span>
              <button
                onClick={() => onOpenPdf(item.base64)}
                className="ml-4 min-w-[150px] rounded-md bg-gray-500 px-4 py-1 text-white hover:bg-gray-600"
              >
                Відкрити PDF
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
