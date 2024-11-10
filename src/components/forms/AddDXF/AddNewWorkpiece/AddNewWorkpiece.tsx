import { Button, Form, Input, notification } from 'antd';
import { Detail, useAddDetailMutation } from '../../../../app/services/addDxf';
import { NotificationType } from '../../../../types/notificationType';

export const NewWorkpiece = () => {
    const [addDetail, { isLoading }] = useAddDetailMutation();
    const [api] = notification.useNotification();
    const openNotificationWithIcon = (
        type: NotificationType,
        title: string
    ) => {
        api[type]({
            message: title,
            placement: 'bottomLeft',
        });
    };

    const handleSubmit = async (data: Detail) => {
        const formData: FormData = new FormData();
        const newDetail: Detail = {
            ...data,
            userId: 2,
            body: formData,
        };
        try {
            await addDetail(newDetail);
            openNotificationWithIcon('success', 'Заготовка добавлена');
        } catch {
            openNotificationWithIcon(
                'error',
                'Заготовка не добавлена. Попробйте еще раз'
            );
        }
    };
    return (
        <Form className='formgap' onFinish={handleSubmit}>
            <Form.Item>
                <Input placeholder='Обозначение'></Input>
            </Form.Item>
            <Form.Item>
                <Input placeholder='Длина'></Input>
            </Form.Item>
            <Form.Item>
                <Input placeholder='Ширина'></Input>
            </Form.Item>
            <Button
                className='bottom-btn'
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
