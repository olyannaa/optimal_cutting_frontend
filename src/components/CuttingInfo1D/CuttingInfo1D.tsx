import { Button, Form } from 'antd';
import styles from './CuttingInfo1D.module.css';

import { Table } from '../custom-table/Table';

export const CuttingInfo1D = () => {
	const [form] = Form.useForm();
	const createScheme = (data: any) => {
		console.log(data);
	};
	return (
		<Form
			className={styles['cutting-info-1D']}
			onFinish={createScheme}
			form={form}
		>
			<Table typeTable="detail1D" />
			<Table typeTable="workpiece" />
			<Button
				type="primary"
				danger
				className={styles['btn-create-scheme']}
				htmlType="submit"
			>
				Создать схему
			</Button>
		</Form>
	);
};
