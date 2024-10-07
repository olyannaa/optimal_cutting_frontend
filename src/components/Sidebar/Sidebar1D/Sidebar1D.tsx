import { Button, Flex, } from 'antd';
import styles from './Siderbar1D.module.css'
import { DetailTable } from './DetailTable/DetailTable';
import { BlankTable } from './BlankTable/BlankTable';

export const Sidebar1D = ()=>{
	return(
		<>
			<Flex vertical className={styles['sidebar-1D']} gap='20px'>
				<DetailTable/>
				<BlankTable/>
				<Button type='primary' danger className={styles['btn-create-scheme']}>
					Создать схему
				</Button>
			</Flex>
		</>
	)
}