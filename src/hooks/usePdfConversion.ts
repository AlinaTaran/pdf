import { useState } from 'react';
import { createPdf } from '../api/pdfApi';
import { blobToBase64, base64ToBlob } from '../services/pdfUtils';

export function usePdfConversion() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const convertTextToPdf = async (text: string): Promise<string | null> => {
    try {
      const pdfBlob = await createPdf(text);
      const base64 = await blobToBase64(pdfBlob);

      const blobUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(blobUrl);

      return base64;
    } catch (error) {
      console.error('convertTextToPdf error:', error);
      return null;
    }
  };

  const openPdf = (base64: string) => {
    const pdfBlob = base64ToBlob(base64);
    const blobUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(blobUrl);
  };

  const revokePdfUrl = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
  };

  return {
    pdfUrl,
    convertTextToPdf,
    openPdf,
    revokePdfUrl,
  };
}
