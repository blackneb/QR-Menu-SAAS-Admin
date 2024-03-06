import React from 'react';
import { Button, QRCode } from 'antd';
import { useSelector } from 'react-redux';

const RestaurantQrCode: React.FC = () => {
  const selectedRestorant = useSelector((state:any) => state.selectedRestaurant)
  const downloadQRCode = () => {
    const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div id="myqrcode" style={{ textAlign: 'center', marginTop: '50px' }} className='flex flex-col w-full items-center justify-center'>
      <QRCode value={selectedRestorant.url} bgColor="#fff" size={300} style={{ marginBottom: 16 }} />
      <br />
      <Button type="primary" onClick={downloadQRCode} style={{ backgroundColor: '#800020', borderColor: '#800020' }}>
        Download
      </Button>
    </div>
  );
};

export default RestaurantQrCode;
