import { Button, Flex, Form, notification } from 'antd';
import { useCalculate1DMutation } from '../../../app/services/cutting';
import {
    changeDetails1DCalculate,
    changeWorkpiece1DCalculate,
} from '../../../functions/processingDataInput';
import { Table } from '../../custom-table/Table';
import { TableTypes } from '../../../types/typeTable';
import { ICalculateError } from '../../../types/Error';

export const Cutting1DForm = () => {
    const [formDetail] = Form.useForm();
    const [formWorkpiece] = Form.useForm();
    const [calculate1D] = useCalculate1DMutation();
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (error: string) => {
        api.error({
            message: 'Ошибка',
            description: error,
            className: 'custom-class',
            style: {
                width: 600,
            },
        });
    };
    const handlerSubmit = async () => {
        try {
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
        } catch (err) {
            if (
                (err as ICalculateError).originalStatus === 500 &&
                (err as ICalculateError).data.slice(0, 50) ===
                    'System.Exception: detail length > workpiece length'
            ) {
                openNotification('Длина детали больше длины заготовки');
            } else {
                openNotification('Сервис временно не доступен. Попробуйте позже');
            }
        }
    };
    return (
        <>
            {contextHolder}
            <Flex className='formgap'>
                <Table typeTable={TableTypes.detail1D} form={formDetail} />
                <Table typeTable={TableTypes.workpieces} form={formWorkpiece} />
                <Button
                    type='primary'
                    danger
                    className='btn-bottom'
                    onClick={() => handlerSubmit()}
                >
                    Создать схему
                </Button>
            </Flex>
        </>
    );
};
