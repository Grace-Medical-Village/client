import React from 'react';
import { Row, Typography, Layout } from 'antd';

const { Text } = Typography;

function Footer(): JSX.Element {
  return (
    <>
      <Layout.Footer>
        <Row justify="center">
          <Text>
            Email the{' '}
            <a href="mailto:timothy_lee@alumni.emory.edu,brettbotto@gmail.com">
              dev team
            </a>{' '}
            with feedback so we can improve.
          </Text>
        </Row>
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
