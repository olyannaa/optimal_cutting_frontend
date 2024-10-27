import { Layout } from 'antd';
import { Header } from './Header/Header';
import { Outlet } from 'react-router-dom';
import { SelectedMode } from './SelectedMode/SelectedMode';

export const CustomLayout = () => {
	return (
		<Layout style={{ height: '100vh' }}>
			<Header />
			<SelectedMode>
				<Outlet />
			</SelectedMode>
		</Layout>
	);
};
