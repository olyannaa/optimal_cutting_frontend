import { Flex } from 'antd';
import { TableInput } from '../../custom-input/TableInput/TableInput';
import styles from './TableCell.module.css';
import { nameColumns } from '../../const/tableOptions';
import { ICustomTableRow } from '../../../types/CustomTable';
import { CellTypes, TableTypes } from '../../../types/typeTable';

type Props = {
	typeCell: CellTypes;
	isHeader: boolean;
	rowInfo: ICustomTableRow;
	typeTable: TableTypes;
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
			(typeCell === CellTypes.length ||
				typeCell === CellTypes.weight ||
				typeCell === CellTypes.count) ? (
				<Flex
					align="center"
					justify="center"
					className={styles['body']}
				>
					{nameColumns[typeCell]}
				</Flex>
			) : isHeader ? (
				nameColumns[typeCell]
			) : typeCell === CellTypes.number || typeCell === CellTypes.detail ? (
				rowInfo[typeCell]
			) : (
				<TableInput
					name={`${typeCell}_${rowInfo.number}`}
					typeCell={typeCell}
					typeTable={typeTable}
				/>
			)}
		</Flex>
	);
};
