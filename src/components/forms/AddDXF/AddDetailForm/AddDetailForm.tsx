import { Button, Form, Input, Select } from 'antd';
import Upload, { UploadProps } from '../../../buttons/UploadButton/Upload';
import { useState } from 'react';
import styles from './AddDetail.module.css';
import {
    Detail,
    useAddDetailMutation,
    useGetMaterialQuery,
} from '../../../../app/services/addDxf';

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
        const newDetail: Detail = {
            ...data,
            filename: fileList[0].name,
            userId: 2,
            body: formData,
        };
        try {
            const image = await addDetail(newDetail);
            if (image.data) {
                setImg(URL.createObjectURL(image.data));
            }
        } catch {
            console.log('Деталь не добавлена. Попробуйте еще раз');
        }
    };

    return (
        <Form
            className={styles['detail-form__container']}
            onFinish={handleSubmit}
        >
            <Form.Item name='designation'>
                <Input
                    className={styles['detail-form__input']}
                    placeholder='Обозначение'
                ></Input>
            </Form.Item>
            <Form.Item name='name'>
                <Input placeholder='Наименование'></Input>
            </Form.Item>
            <Form.Item name='thickness'>
                <Input placeholder='Толщина'></Input>
            </Form.Item>
            <Upload
                updateUploadFiles={setFiles}
                uploadedFiles={fileList}
                props={props}
            />
            <Form.Item name='materialId'>
                <Select placeholder='Материал' options={materials}></Select>
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