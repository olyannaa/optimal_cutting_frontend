import { Button, Form, Input, notification } from 'antd';
import {
    ReqWorkpiece,
    useNewWorkpieceMutation,
} from '../../../../app/services/addDxf';
import styles from '../AddDetailForm/AddDetail.module.css';
import { useEffect } from 'react';

export const NewWorkpiece = ({
    setImg,
}: {
    setImg: (value: string) => void;
}) => {
    const [addWorkpiece, { isLoading }] = useNewWorkpieceMutation();
    useEffect(() => {
        setImg('');
    }, []);

    const handleSubmit = async (data: ReqWorkpiece) => {
        const result = await addWorkpiece(data);
        if (result.error) {
            notification.error({
                message: 'Заготовка не добавлена',
                description:
                    'Возможно внутренняя ошибка или неполадки с интернетом. Попробуйте еще раз.',
                placement: 'bottomLeft',
                duration: 5,
            });
        } else {
            notification.success({
                message: 'Заготовка добавлена',
                placement: 'bottomLeft',
                duration: 5,
            });
        }
    };
    return (
        <Form
            className={styles['detail-form__container']}
            onFinish={handleSubmit}
        >
            {[
                { name: 'name', placeholder: 'Обозначение' },
                { name: 'height', placeholder: 'Длина' },
                { name: 'width', placeholder: 'Ширина' },
            ].map(({ name, placeholder }) => (
                <Form.Item
                    key={name}
                    name={name}
                    rules={[{ required: true, message: '' }]}
                    className={styles['detail-form__item']}
                >
                    <Input placeholder={placeholder} />
                </Form.Item>
            ))}
            <Button
                className='btn-bottom'
                danger
                type='primary'
                htmlType='submit'
                loading={isLoading}
            >
                Добавить
            </Button>
        </Form>
    );
};
