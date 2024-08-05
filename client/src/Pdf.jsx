import React,{useState} from 'react';
import { pdfjs,Document, Page } from 'react-pdf';
import useDownloader from 'react-use-downloader';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function Pdf({source,name}) {
  console.log(name)
  const {  download} =
    useDownloader();
  
  return (
    <div>
      <Document file={source}>
        <Page pageNumber={1} height={20} width={200}/>
      </ Document>
     
      <DownloadForOfflineIcon onClick={()=> download(source,name)}/>
    
    </div>
  );
}