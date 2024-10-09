import { Form, Input } from 'antd';
import styles from './TableInput.module.css';

type Props = {
	name: string;
	placeholder?: string;
	type?: string;
};

export const TableInput = ({ name, placeholder, type = 'text' }: Props) => {
	console.log(name);
	return (
		<Form.Item
			name={name}
			className={styles.formItem}
			style={{ width: `${type === 'count' ? '50px' : '60px'}` }}
		>
			<Input
				placeholder={placeholder}
				type={type === 'count' ? 'number' : 'text'}
				className={styles.tableInput}
				style={{ height: `${type === 'count' ? '24px' : '32px'}` }}
			/>
		</Form.Item>
	);
};
