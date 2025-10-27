// frontend/src/pages/PaymentSuccess.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';

const PaymentSuccess = () => {
  const location = useLocation();
  const [sessionId, setSessionId] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('session_id');
    if (id) {
      setSessionId(id);
      setQrUrl(`http://localhost:5000/qr_codes/ticket_${id}.png`);
      setTimeout(() => setLoading(false), 3000); // give backend time to generate QR
    }
  }, [location.search]);

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Payment Successful 🎉
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Here is your ticket QR Code:
          </Typography>
          <img
            src={qrUrl}
            alt="Ticket QR Code"
            style={{ width: '300px', marginTop: '20px' }}
            onError={() => setQrUrl('')} // fallback in case QR isn't ready
          />
        </>
      )}
    </Box>
  );
};

export default PaymentSuccess;
