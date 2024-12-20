import { Button, Flex, Form } from 'antd';
import styles from './Cutting1DForm.module.css';
import { useCalculate1DMutation } from '../../../app/services/cutting';
import {
    changeDetails1DCalculate,
    changeWorkpiece1DCalculate,
} from '../../../functions/processingDataInput';
import { Table } from '../../custom-table/Table';
import { TableTypes } from '../../../types/typeTable';

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
        <Flex className={styles['cutting-form']}>
            <Table typeTable={TableTypes.detail1D} form={formDetail} />
            <Table typeTable={TableTypes.workpieces} form={formWorkpiece} />
            <Button
                type='primary'
                danger
                className='bottom-btn'
                onClick={() => handlerSubmit()}
            >
                Создать схему
            </Button>
        </Flex>
    );
};
