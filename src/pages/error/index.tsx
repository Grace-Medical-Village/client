import React, { useEffect, useState } from 'react';
import { Typography, Row } from 'antd';
import { useHistory } from 'react-router-dom';

import './styles.css';

const { Title } = Typography;

export default function Error() {
  const [countdown, set] = useState(3);
  const history = useHistory();

  useEffect(() => {
    if (countdown === 0) history.push('/dashboard');
    const interval = setInterval(() => set(countdown - 1), 750);
    return () => clearInterval(interval);
  }, [countdown, history]);

  return (
    <>
      <div className="error">
        <Row justify="center">
          <Title level={2}>Error</Title>
        </Row>
        <Row justify="center">
          <Title level={3}>
            Taking you back to the dashboard in {countdown}.
          </Title>
        </Row>
      </div>
    </>
  );
}
