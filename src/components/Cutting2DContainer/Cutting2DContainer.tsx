import { Flex } from 'antd';
import { Cutting2DForm } from '../forms/Cutting2DForm/Cutting2DForm';
import { useAppSelector } from '../../app/hooks';
import { selectCalculateData2D } from '../../features/cutting2DSlice';
import { CuttingDownload } from '../CuttingDownload/CuttingDownload';

export const Cutting2DContainer = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const dataCalculate2D = useAppSelector(selectCalculateData2D);
    return (
        <Flex style={{ height: '100%' }}>
            <Cutting2DForm />
            {children}
            {dataCalculate2D.workpiece && (
                <CuttingDownload selectCalculateData={selectCalculateData2D} />
            )}
        </Flex>
    );
};
