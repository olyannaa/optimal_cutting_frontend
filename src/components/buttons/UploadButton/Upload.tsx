import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './Upload.module.css';
import { Form, Input } from 'antd';
import React from 'react';
export type UploadProps = {
    required: boolean;
    multiple: boolean;
    accept: string;
    title: string;
};

const Upload = ({
    updateUploadFiles,
    uploadedFiles,
    props,
}: {
    updateUploadFiles: React.Dispatch<React.SetStateAction<File[]>>;
    uploadedFiles: File[];
    props: UploadProps;
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            if (!props.multiple) {
                updateUploadFiles([...event.target.files]);
            } else {
                updateUploadFiles([
                    ...(uploadedFiles ?? []),
                    ...event.target.files,
                ]);
            }
        }
    };
    const removeFile = (indexI: number) => {
        if (uploadedFiles) {
            const currentFiles = uploadedFiles.filter(
                (file, index) => index !== indexI
            );

            updateUploadFiles(currentFiles);
        }
    };
    return (
        <div>
            <Form.Item
                name={'files'}
                rules={[
                    {
                        required:
                            uploadedFiles.length > 0 ? false : props.required,
                        message: 'Обязательное поле',
                    },
                ]}
            >
                <div className={styles.upload_container}>
                    <UploadOutlined
                        style={{
                            fontSize: '14px',
                            color: 'rgba(0, 0, 0, 0.25)',
                        }}
                    />
                    <label
                        htmlFor='file-loader-button'
                        className={styles.upload_label}
                    >
                        {props.title}
                    </label>
                    <Input
                        id='file-loader-button'
                        className={styles.upload_input}
                        type='file'
                        multiple={props.multiple}
                        accept={props.accept}
                        onChange={handleChange}
                    />
                </div>
            </Form.Item>
            <div className={styles.file_container}>
                {uploadedFiles &&
                    uploadedFiles.map((file, index) => (
                        <div key={index} className={styles.file}>
                            {file.name}
                            <DeleteOutlined
                                style={{
                                    fontSize: '14px',
                                    color: 'rgba(0, 0, 0, 0.45)',
                                }}
                                onClick={() => removeFile(index)}
                                className={styles.remove_file}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};
export default Upload;
