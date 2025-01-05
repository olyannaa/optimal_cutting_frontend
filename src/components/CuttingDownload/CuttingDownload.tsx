import { Button, Flex } from 'antd';
import styles from './CuttingDownload.module.css';
import { useAppSelector } from '../../app/hooks';
import {
    downloadFile1DCutting,
    downloadFile2DCutting,
} from '../../functions/fetchFiles';
import { ICalculate1D } from '../../types/Calculated1D';
import { ResultCalculate2D } from '../../types/Calculated2D';
import { RootState } from '../../app/store';
import { isICalculate1D } from '../../functions/typeGuards/calculate1D';

export const CuttingDownload = ({
    selectCalculateData,
}: {
    selectCalculateData: (state: RootState) => ICalculate1D | ResultCalculate2D;
}) => {
    const dataCalculate = useAppSelector(selectCalculateData);
    const is2D: boolean = !isICalculate1D(dataCalculate);

    const handlerDownloadPDF = async () => {
        if (isICalculate1D(dataCalculate)) {
            await downloadFile1DCutting(JSON.stringify(dataCalculate), 'pdf');
        } else {
            await downloadFile2DCutting(JSON.stringify(dataCalculate), 'pdf');
        }
    };

    const handlerDownloadCSV = async () => {
        await downloadFile1DCutting(JSON.stringify(dataCalculate), 'csv');
    };

    const handlerDownloadDXF = async () => {
        await downloadFile2DCutting(JSON.stringify(dataCalculate), 'dxf');
    };

    return (
        <Flex vertical className={styles['cutting-1D-download']}>
            <Button type='primary' onClick={() => handlerDownloadPDF()}>
                Скачать схему pdf
            </Button>
            {is2D ? (
                <Button onClick={() => handlerDownloadDXF()}>
                    Скачать схему dxf
                </Button>
            ) : (
                <Button onClick={() => handlerDownloadCSV()}>
                    Скачать схему csv
                </Button>
            )}
        </Flex>
    );
};
