import { Flex } from 'antd';
import styles from './SelectCutting.module.css';
import { useLocation } from 'react-router-dom';
import { CuttingInfo1D } from '../CuttingInfo1D/CuttingInfo1D';

export const SelectCutting = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const path = useLocation().pathname;

	return (
		<Flex vertical className={styles['select-cutting']}>
			{path === '/cutting/1D' && (
				<CuttingInfo1D>{children}</CuttingInfo1D>
			)}
		</Flex>
	);
};
