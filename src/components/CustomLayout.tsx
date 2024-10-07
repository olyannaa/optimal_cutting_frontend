import { Flex, Layout } from 'antd';
import { Header } from './Header/Header';
import { Outlet } from 'react-router-dom';
import { SidebarWrapper } from './Sidebar/SidebarWrapper/SidebarWrapper';

export const CustomLayout = ()=>{
	return(
		<Layout style={{height:'100vh'}}>
			<Header/>
			<Flex style={{height:'93.12%'}}>
				<SidebarWrapper/>
				<Outlet/>
			</Flex>
		</Layout>
	)
}