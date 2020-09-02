import React from 'react';
import { Row, Typography, Layout } from 'antd';

const { Text } = Typography;

function Footer() {
  return (
    <>
      <Layout.Footer>
        <Row justify="center">
          <Text>
            Do all things with <span role="img">❤</span>️
          </Text>
        </Row>
      </Layout.Footer>
    </>
  );
}

export default Footer;
