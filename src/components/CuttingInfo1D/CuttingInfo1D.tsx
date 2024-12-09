import { Flex } from 'antd';
import styles from './CuttingInfo1D.module.css';
import { Cutting1DForm } from '../forms/Cutting1DForm/Cutting1DForm';
import { Cutting1DDownload } from '../Cutting1DDownload/Cutting1DDownload';
import { useAppSelector } from '../../app/hooks';
import { selectCalculateData1D } from '../../features/cutting1DSlice';
import { FormContainer } from '../FormContainer/FormContainer';

export const CuttingInfo1D = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const dataCalculate1D = useAppSelector(selectCalculateData1D);
    return (
        <Flex className={styles['cutting-info-1D']}>
            <FormContainer>
                <Cutting1DForm />
            </FormContainer>
            {children}
            {dataCalculate1D.workpieces.length !== 0 && <Cutting1DDownload />}
        </Flex>
    );
};
