import React from 'react';
import { pdfjs,Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function Pdf({source,name}) {
 

  return (
    <div>
      <Document file={source} >
        <Page pageNumber={1} height={20} width={200}/>
      </ Document>
     <a href={source} download={name} >Download</a>
    </div>
  );
}