import { Flex, Image } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { selectCalculateData1D } from '../../features/cutting1DSlice';
import { useEffect, useState } from 'react';
import { getPNG1DCutting } from '../../functions/fetchFiles';
import styles from './Cutting1D.module.css';
import { TableResult } from '../../components/TableResult/TableResult';

export const Cutting1D = () => {
    const dataCalculate1D = useAppSelector(selectCalculateData1D);
    const [image, setImage] = useState<string>('');
    const getPng = async () => {
        if (dataCalculate1D.workpieces.length !== 0) {
            const dataPng = await getPNG1DCutting(JSON.stringify(dataCalculate1D));
            setImage(dataPng);
        }
    };
    useEffect(() => {
        getPng();
    }, [dataCalculate1D]);
    return (
        <Flex vertical style={{ width: '100%' }} className={styles.cutting1D}>
            {dataCalculate1D.workpieces.length !== 0 && (
                <>
                    <Image src={image} preview={false} />
                    <TableResult />
                </>
            )}
        </Flex>
    );
};
