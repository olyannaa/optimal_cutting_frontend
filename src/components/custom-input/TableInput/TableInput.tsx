import { Form, Input, InputNumber } from 'antd';
import styles from './TableInput.module.css';
import { useAppSelector } from '../../../app/hooks';
import { selectMaxLengthWorkpieces } from '../../../features/maxLengthWorkpieces';
import { CellTypes, TableTypes } from '../../../types/typeTable';

type Props = {
	name: string;
	placeholder?: string;
	typeCell: CellTypes;
	typeTable: TableTypes;
};

export const TableInput = ({
	name,
	placeholder,
	typeCell,
	typeTable,
}: Props) => {
	const maxLength = useAppSelector(selectMaxLengthWorkpieces);
	return (
		<Form.Item
			name={name}
			className={styles.formItem}
			rules={[
				{
					required: true,
					message: '',
				},
			]}
		>
			{typeCell === CellTypes.detail ? (
				<Input
					placeholder={placeholder}
					type={'text'}
					className={styles.tableInput}
					style={{ height: '32px' }}
				/>
			) : (
				<InputNumber
					className={styles.tableInput}
					size={typeCell === CellTypes.count ? 'small' : 'middle'}
					min={1}
					max={
						typeTable === TableTypes.detail1D &&
						typeCell === CellTypes.length
							? maxLength.maxLength
							: 1000000000
					}
					controls={typeCell === CellTypes.count}
				/>
			)}
		</Form.Item>
	);
};
