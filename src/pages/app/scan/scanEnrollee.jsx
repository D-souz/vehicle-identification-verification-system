import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";
import { saveScanResult } from './scanStore';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



const ScanPage = () => {
  const dispatch = useDispatch();
  const { scanResult } = useSelector((state) => state.qrCodeScanner);


  useEffect(() => {

    const qrCodeScanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: 250 },
      /* verbose= */ false
    );

 

  const scanSuccess = (result) => {
    qrCodeScanner.clear();
    dispatch(saveScanResult(result))
  }

  const scanError = (error) => {
      console.error('Error scanning QR code:', error);
  };
  
  qrCodeScanner.render(scanSuccess, scanError); 
  }, [])

  return (
    <div>
      {/* <div>
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">Scanning enrollee qr code</h4>
      </div> */}
      {
        scanResult
        ?
        <div>
           <h4 className="font-medium lg:text-2xl text-xl capitalize text-success inline-block ltr:pr-4 rtl:pl-4">Scanning successful: </h4>
        <div className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          <Link to='/scan-details'>View scanned details</Link>
        </div>
        </div>
        : 
        <div id='reader'></div>
      }
    </div>
  )
}

export default ScanPage;