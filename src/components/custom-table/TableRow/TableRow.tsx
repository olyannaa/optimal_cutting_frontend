import { Flex } from 'antd';
import styles from './TableRow.module.css';
import { tableOptions } from '../../const/tableOptions';
import { TableCell } from '../TableCell/TableCell';

type Props = {
	typeTable: 'detail1D' | 'workpiece' | 'detail2D' | 'sizes2D';
	isHeader?: boolean;
	rowInfo?: any;
};

export const TableRow = ({ typeTable, isHeader = false, rowInfo }: Props) => {
	return (
		<Flex
			className={`${styles['table__row']} ${
				styles[`table__row_${typeTable}`]
			}`}
		>
			{tableOptions[typeTable].map((col, i) => (
				<TableCell
					isHeader={isHeader}
					typeCell={col}
					rowInfo={rowInfo}
					typeTable={typeTable}
					key={i}
				/>
			))}
		</Flex>
	);
};
