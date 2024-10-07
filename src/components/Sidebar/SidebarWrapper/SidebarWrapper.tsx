import { Flex } from 'antd';
import styles from './SidebarWrapper.module.css'
import { useLocation } from 'react-router-dom';
import { Sidebar1D } from '../Sidebar1D/Sidebar1D';

export const SidebarWrapper=()=>{
	const path = useLocation().pathname
	
	return(
		<Flex vertical className={styles['sidebar-wrapper']}>
			{
				path === '/cutting1D' && <Sidebar1D/>
			}

		</Flex>
	)
}