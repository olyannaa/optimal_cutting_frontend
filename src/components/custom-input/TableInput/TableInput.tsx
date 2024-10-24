import { Form, Input, InputNumber } from 'antd';
import styles from './TableInput.module.css';
import { useAppSelector } from '../../../app/hooks';
import { selectMaxLengthWorkpieces } from '../../../features/maxLengthWorkpieces';

type Props = {
	name: string;
	placeholder?: string;
	type?: string;
	typeTable: 'detail1D' | 'workpiece' | 'detail2D' | 'sizes2D';
};

export const TableInput = ({
	name,
	placeholder,
	type = 'text',
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
			{type === 'detail' ? (
				<Input
					placeholder={placeholder}
					type={'text'}
					className={styles.tableInput}
					style={{ height: '32px' }}
				/>
			) : (
				<InputNumber
					className={styles.tableInput}
					size={type === 'count' ? 'small' : 'middle'}
					min={1}
					max={
						typeTable === 'detail1D' && type === 'length'
							? maxLength.maxLength
							: 1000000000
					}
					controls={type === 'count'}
				/>
			)}
		</Form.Item>
	);
};
