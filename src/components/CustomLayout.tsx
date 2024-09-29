import { Layout } from 'antd';
import { Header } from './Header/Header';
import { Outlet } from 'react-router-dom';

export const CustomLayout = ()=>{
	return(
		<Layout>
			<Header/>
			<Outlet/>
		</Layout>
	)
}