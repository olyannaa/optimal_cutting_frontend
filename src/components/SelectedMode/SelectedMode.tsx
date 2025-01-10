import { Flex } from 'antd';
import styles from './SelectedMode.module.css';
import { useLocation } from 'react-router-dom';
import { CuttingInfo1D } from '../CuttingInfo1D/CuttingInfo1D';
import { Cutting2DContainer } from '../Cutting2DContainer/Cutting2DContainer';

export const SelectedMode = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    const path = useLocation().pathname;

    return (
        <Flex vertical className={styles['select-cutting']}>
            {path === '/cutting/1D' && (
                <CuttingInfo1D>{children}</CuttingInfo1D>
            )}
            {path === '/cutting/2D' && (
                <Cutting2DContainer>{children}</Cutting2DContainer>
            )}
            {path === '/newDetail' && children}
        </Flex>
    );
};
