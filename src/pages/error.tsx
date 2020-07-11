import React, { useEffect, useState } from 'react';
import { Typography, Row } from 'antd';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

export default function Error() {
	const [countdown, set] = useState(3);
	let history = useHistory();

	useEffect(() => {
		console.log(countdown);
		if (countdown === 0) {
			history.push('/dashboard');
		}
		const interval = setInterval(() => set(countdown - 1), 750);
		console.log(countdown);
		return () => clearInterval(interval);
	}, [countdown, history]);

	return (
		<>
			<Row justify='center'>
				<Title level={3}>That's not quite right</Title>
			</Row>
			<Row justify='center'>
				<Title level={4}>
					Taking you back to the dashboard in {countdown}.
				</Title>
			</Row>
		</>
	);
}
