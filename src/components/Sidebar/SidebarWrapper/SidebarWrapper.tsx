import { Flex, Typography } from 'antd';
import styles from './SidebarWrapper.module.css'
import { useLocation } from 'react-router-dom';
import { Sidebar1D } from '../Sidebar1D/Sidebar1D';

export const Sidebar=()=>{
	const path = useLocation().pathname
	console.log(path)
	return(
		<Flex vertical className={styles.sidebar}>
			{
				path === '/cutting1D' ? <Sidebar1D/> : ''
			}

		</Flex>
	)
}