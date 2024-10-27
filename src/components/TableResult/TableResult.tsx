import { Flex, Table } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { selectCalculateData1D } from '../../features/cutting1DSlice';
import styles from './TableResult.module.css';

export const TableResult = () => {
	const dataResult = useAppSelector(selectCalculateData1D);
	const dataTable = dataResult.workpieces.map((el, i) => {
		return {
			number: i + 1,
			percentUsage: el.percentUsage,
			details: el.details.join(','),
			length: el.length,
			key:i
		};
	});
	const columns = [
		{
			title: 'Заготовка',
			dataIndex: 'number',
			key: 'number',
		},
		{
			title: 'Использование',
			dataIndex: 'percentUsage',
			key: 'percentUsage',
		},
		{
			title: 'Длины деталей',
			dataIndex: 'details',
			key: 'details',
		},
		{
			title: 'Длина заготовки',
			dataIndex: 'length',
			key: 'length',
		},
	];
	return (
		<Flex vertical className={styles['table-result']}>
			<Flex className={styles['table-result__title']}>Результат</Flex>
			<Flex
				className={styles['table-result__count-workpiece']}
			>{`К-во заготовок = ${dataTable.length}`}</Flex>
			<Table
				columns={columns}
				dataSource={dataTable}
				pagination={false}
			/>
		</Flex>
	);
};
