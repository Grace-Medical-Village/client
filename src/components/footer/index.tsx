import React from 'react';
import { Row, Typography, Layout } from 'antd';

const { Text } = Typography;

function Footer(): JSX.Element {
  return (
    <>
      <Layout.Footer>
        <Row justify="center">
          <Text>
            Do all things with <span role="img">❤</span>️.
          </Text>
        </Row>
        <Row justify="center">
          <Text>
            Email{' '}
            <a href="mailto:dev@gracemedicalvillage.com">
              dev@gracemedicalvillage.com
            </a>{' '}
            with suggestions.
          </Text>
        </Row>
      </Layout.Footer>
    </>
  );
}

export default Footer;
