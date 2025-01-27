import { Form, Input, InputNumber } from 'antd';
import styles from './TableInput.module.css';
import { CellTypes } from '../../../types/typeTable';

type Props = {
    name: string;
    value?: string;
    typeCell: CellTypes;
};

export const TableInput = ({ name, value, typeCell }: Props) => {
    return (
        <Form.Item
            name={name}
            className={styles.formItem}
            rules={
                typeCell !== CellTypes.detail
                    ? [
                          {
                              required: true,
                              message: '',
                          },
                      ]
                    : []
            }
        >
            {typeCell === CellTypes.detail ? (
                <Input
                    defaultValue={value}
                    value={212}
                    type={'text'}
                    className={styles.tableInputDetail}
                    style={{ height: '32px' }}
                />
            ) : (
                <InputNumber
                    className={styles.tableInput}
                    size={typeCell === CellTypes.count ? 'small' : 'middle'}
                    min={1}
                    max={1000000000}
                    controls={typeCell === CellTypes.count}
                />
            )}
        </Form.Item>
    );
};
