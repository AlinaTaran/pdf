import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

interface PdfViewerContainerProps {
  fileUrl: string | null;
}

export const PdfViewerContainer = ({ fileUrl }: PdfViewerContainerProps) => {
  if (!fileUrl) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="mb-2 text-xl font-semibold">Згенерований PDF</h2>
      <div className="rounded border p-2 shadow" style={{ height: '500px' }}>
        <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js">
          <Viewer fileUrl={fileUrl} />
        </Worker>
      </div>
    </div>
  );
};
