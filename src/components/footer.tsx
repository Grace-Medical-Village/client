import React from 'react';
import { Row, Typography } from 'antd';

const { Text } = Typography;

function Footer() {
	return (
		<>
			<Row justify='center'>
				<Text>
					Do all things with <span role='img'>❤</span>️
				</Text>
			</Row>
		</>
	);
}

export default Footer;
