import { Flex, Layout } from 'antd';
import { Header } from './Header/Header';
import { Outlet } from 'react-router-dom';
import { SelectCutting } from './SelectCutting/SelectCutting';

export const CustomLayout = () => {
	return (
		<Layout style={{ height: '100vh' }}>
			<Header />
			<Flex style={{ height: '93%' }}>
				<SelectCutting />
				<Outlet />
			</Flex>
		</Layout>
	);
};
