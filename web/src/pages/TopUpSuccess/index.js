import React, { useEffect } from 'react';
import { Typography } from '@douyinfe/semi-ui';

const TopUpSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/topup';
    }, 3000);
  }, []);
  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <Typography.Title>Payment Successful!</Typography.Title>
      <Typography.Paragraph>
        Your account has been topped up. Redirecting...
      </Typography.Paragraph>
    </div>
  );
};

export default TopUpSuccess;
