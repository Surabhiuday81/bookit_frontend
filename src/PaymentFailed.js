import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h4" gutterBottom color="error">
        Payment Incomplete ❌
      </Typography>
      <Typography variant="h6" gutterBottom>
        It looks like the payment didn’t go through. Don’t worry!
      </Typography>
      <Typography variant="body1" gutterBottom>
        You’ll be redirected to the homepage shortly. If this was a mistake, you can try booking again.
      </Typography>
      <CircularProgress sx={{ mt: 3 }} />
    </Box>
  );
};

export default PaymentFailed;
