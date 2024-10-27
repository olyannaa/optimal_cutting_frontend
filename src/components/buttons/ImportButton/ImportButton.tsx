import { Form, Image, Input } from 'antd';
import srcImport from '../../../assets/icons/import.svg';
import styles from './ImportButton.module.css';

export const ImportButton = ({
    onChange,
    name,
}: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    name: string;
}) => {
    return (
        <Form.Item>
            <label htmlFor='input-files' className={styles['btn-import']}>
                <Image
                    preview={false}
                    src={srcImport}
                    width={'17px'}
                    height={'17px'}
                    className={styles['btn-import__image']}
                />
                Импорт
            </label>
            <Input
                className={styles['upload-input']}
                id='input-files'
                type='file'
                name={name}
                onChange={onChange}
            />
        </Form.Item>
    );
};
