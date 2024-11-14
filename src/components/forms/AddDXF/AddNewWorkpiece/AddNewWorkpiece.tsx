import { Button, Form, Input } from 'antd';
import { Detail, useAddDetailMutation } from '../../../../app/services/addDxf';

export const NewWorkpiece = () => {
    const [addDetail, { isLoading }] = useAddDetailMutation();

    const handleSubmit = async (data: Detail) => {
        const formData: FormData = new FormData();
        const newDetail: Detail = {
            ...data,
            userId: 2,
            body: formData,
        };
        try {
            await addDetail(newDetail);
        } catch {
            console.log('Заготовка не добавлена');
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
