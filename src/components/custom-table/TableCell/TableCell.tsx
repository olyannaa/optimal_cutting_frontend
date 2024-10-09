import { Flex } from 'antd';
import { TableInput } from '../../custom-input/TableInput/TableInput';
import styles from './TableCell.module.css';
import { nameColumns } from '../../const/tableOptions';

type Props = {
	typeTable: 'detail1D' | 'workpiece' | 'detail2D' | 'sizes2D';
	typeCell: 'number' | 'length' | 'weight' | 'count' | 'detail';
	isHeader: boolean;
	rowInfo?: any;
};

export const TableCell = ({
	typeCell,
	rowInfo,
	isHeader,
	typeTable,
}: Props) => {
	return (
		<Flex
			align="center"
			justify="center"
			className={`${styles['table__cell']} ${
				styles[`table__cell_${typeCell}`]
			} ${isHeader && styles[`table__cell_header`]}
			`}
		>
			{isHeader &&
			(typeCell === 'length' ||
				typeCell === 'weight' ||
				typeCell === 'count') ? (
				<Flex
					align="center"
					justify="center"
					className={styles['body']}
				>
					{nameColumns[typeCell]}
				</Flex>
			) : isHeader ? (
				nameColumns[typeCell]
			) : typeCell === 'number' || typeCell === 'detail' ? (
				rowInfo[typeCell]
			) : (
				<TableInput
					name={`${typeTable}${typeCell}${rowInfo.number}`}
					type={typeCell}
				/>
			)}
		</Flex>
	);
};
