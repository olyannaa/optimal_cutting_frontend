import { Flex, Image } from 'antd';
import { TableInput } from '../../custom-input/TableInput/TableInput';
import styles from './TableCell.module.css';
import { nameColumns } from '../../const/tableOptions';
import { ICustomTableRow } from '../../../types/CustomTable';

type Props = {
	typeCell: 'number' | 'length' | 'weight' | 'count' | 'detail';
	isHeader: boolean;
	rowInfo: ICustomTableRow;
	typeTable: 'detail1D' | 'workpiece' | 'detail2D' | 'sizes2D';
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
			} `}
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
					name={`${typeCell}_${rowInfo.number}`}
					type={typeCell}
					typeTable={typeTable}
				/>
			)}
		</Flex>
	);
};
