import React, { useEffect } from 'react';
import { TextToPdfForm } from '../components/TextToPdfForm';
import { PdfViewerContainer } from '../components/PdfViewerContainer';
import { HistoryList } from '../components/HistoryList';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { usePdfConversion } from '../hooks/usePdfConversion';

interface HistoryItem {
  id: number;
  text: string;
  base64: string;
}

const HomePage: React.FC = () => {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(
    'pdfHistory',
    []
  );
  const { pdfUrl, convertTextToPdf, openPdf, revokePdfUrl } =
    usePdfConversion();

  useEffect(() => {
    return () => {
      revokePdfUrl();
    };
  }, [pdfUrl, revokePdfUrl]);

  const handleConvert = async (text: string) => {
    try {
      const base64 = await convertTextToPdf(text);
      if (base64) {
        // Store in localStorage-based history
        const newItem: HistoryItem = {
          id: Date.now(),
          text,
          base64,
        };
        setHistory([newItem, ...history]);
      }
    } catch (error) {
      console.error('Failed to convert text to PDF.', error);
      alert(
        'Не вдалося перетворити текст у PDF. Будь ласка, спробуйте пізніше.'
      );
    }
  };

  const handleOpenPdf = (base64: string) => {
    openPdf(base64);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Конвертація тексту в PDF
      </h1>

      <TextToPdfForm onConvert={handleConvert} />

      <PdfViewerContainer fileUrl={pdfUrl} />

      <HistoryList history={history} onOpenPdf={handleOpenPdf} />
    </div>
  );
};

export default HomePage;
