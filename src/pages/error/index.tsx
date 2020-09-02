import React, { useEffect, useState } from 'react';
import { Typography, Row } from 'antd';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

export default function Error() {
  const [countdown, set] = useState(3);
  let history = useHistory();

  useEffect(() => {
    if (countdown === 0) history.push('/dashboard');
    const interval = setInterval(() => set(countdown - 1), 750);
    return () => clearInterval(interval);
  }, [countdown, history]);

  return (
    <>
      <Row justify="center">
        <Title level={3}>Error</Title>
      </Row>
      <Row justify="center" style={{ paddingTop: '1rem' }}>
        <Title level={4}>
          Taking you back to the dashboard in {countdown}.
        </Title>
      </Row>
    </>
  );
}
