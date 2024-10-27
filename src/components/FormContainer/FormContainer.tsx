import { Flex } from 'antd';
import styles from './FormContainer.module.css';

export const FormContainer = ({
    children,
}: {
    children: React.ReactElement;
}) => {
    return <Flex className={styles['form-wrapper']}>{children}</Flex>;
};
