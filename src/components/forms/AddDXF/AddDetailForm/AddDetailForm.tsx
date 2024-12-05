import { Button, Form, Input, Select, notification } from 'antd';
import Upload, { UploadProps } from '../../../buttons/UploadButton/Upload';
import { useState } from 'react';
import styles from './AddDetail.module.css';
import {
    Detail,
    useAddDetailMutation,
    useGetMaterialQuery,
} from '../../../../app/services/addDxf';
import { NotFoundContentSelect } from '../../../custom-input/NotFountContentSelect';

const props: UploadProps = {
    required: true,
    multiple: false,
    accept: '.dxf',
    title: 'Загрузить dxf',
};

export const AddDetailForm = ({
    setImg,
}: {
    setImg: (value: string) => void;
}) => {
    const [fileList, setFiles] = useState<File[]>([]);
    const { data } = useGetMaterialQuery();
    const [addDetail, { isLoading }] = useAddDetailMutation();
    const materials: Array<{ value: number; label: string }> = data
        ? data.map((key) => {
              const item = {
                  value: key.id,
                  label: key.name,
              };
              return item;
          })
        : [];

    const handleSubmit = async (data: Detail) => {
        const formData: FormData = new FormData();
        formData.append('file', fileList[0]);
        formData.append('Name', data.name);
        formData.append('Designation', data.designation);
        formData.append('Thickness', data.thickness.toString());
        formData.append('Filename', fileList[0].name);
        formData.append('MaterialId', data.materialId.toString());
        formData.append('UserId', '2');
        const image = await addDetail(formData);

        if (image.data) {
            setImg(URL.createObjectURL(image.data));
            notification.success({
                message: 'Деталь добавлена',
                placement: 'bottomLeft',
                duration: 5,
            });
        } else {
            notification.error({
                message: 'Деталь не добавлена',
                description:
                    'Возможно внутренняя ошибка или неполадки с интернетом. Попробуйте еще раз.',
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
                { name: 'designation', placeholder: 'Обозначение' },
                { name: 'name', placeholder: 'Наименование' },
                { name: 'thickness', placeholder: 'Толщина' },
            ].map(({ name, placeholder }) => (
                <Form.Item
                    key={name}
                    name={name}
                    rules={[{ required: true, message: '' }]}
                >
                    <Input
                        className={styles['detail-form__input']}
                        placeholder={placeholder}
                    />
                </Form.Item>
            ))}
            <Upload
                updateUploadFiles={setFiles}
                uploadedFiles={fileList}
                props={props}
            />
            <Form.Item
                name='materialId'
                rules={[
                    {
                        required: true,
                        message: '',
                    },
                ]}
            >
                <Select
                    placeholder='Материал'
                    options={materials}
                    notFoundContent={<NotFoundContentSelect />}
                ></Select>
            </Form.Item>
            <Button
                className='bottom-btn'
                type='primary'
                danger
                htmlType='submit'
                loading={isLoading}
            >
                Добавить
            </Button>
        </Form>
    );
};
