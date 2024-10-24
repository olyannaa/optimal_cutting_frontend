import { Button, Flex, Form } from 'antd';
import styles from './Cutting1DForm.module.css';
import { useCalculate1DMutation } from '../../../app/services/cutting';
import {
	changeDetails1DCalculate,
	changeWorkpiece1DCalculate,
} from '../../../functions/processingDataInput';
import { Table } from '../../custom-table/Table';

export const Cutting1DForm = () => {
	const [formDetail] = Form.useForm();
	const [formWorkpiece] = Form.useForm();
	const [calculate1D] = useCalculate1DMutation();
	const handlerSubmit = async () => {
		let isValidatedForms = false;
		await formDetail
			.validateFields()
			.then(() => (isValidatedForms = true))
			.catch(() => (isValidatedForms = false));
		await formWorkpiece
			.validateFields()
			.then()
			.catch(() => (isValidatedForms = false));
		if (isValidatedForms) {
			const data = {
				details: changeDetails1DCalculate(formDetail.getFieldsValue()),
				workpiecesLength: changeWorkpiece1DCalculate(
					formWorkpiece.getFieldsValue()
				),
			};
			await calculate1D(data).unwrap();
		}
	};

	return (
		<Flex className={styles['cutting-form-wrapper']}>
			<Flex className={styles['cutting-form']}>
				<Table typeTable="detail1D" form={formDetail} />
				<Table typeTable="workpiece" form={formWorkpiece} />
				<Button
					type="primary"
					danger
					className={styles['btn-create-scheme']}
					onClick={() => handlerSubmit()}
				>
					Создать схему
				</Button>
			</Flex>
		</Flex>
	);
};
