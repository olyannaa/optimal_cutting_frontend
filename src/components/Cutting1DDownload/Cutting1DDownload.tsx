import { Button, Flex } from 'antd';
import styles from './Cutting1DDownload.module.css';
import { selectCalculateData1D } from '../../features/cutting1DSlice';
import { useAppSelector } from '../../app/hooks';
import { downloadFile1DCutting } from '../../functions/fetchFiles';

export const Cutting1DDownload = () => {
	const dataCalculate1D = useAppSelector(selectCalculateData1D);
	const handlerDownloadPDF = async () => {
		await downloadFile1DCutting(JSON.stringify(dataCalculate1D), 'pdf');
	};

	const handlerDownloadCSV = async () => {
		await downloadFile1DCutting(JSON.stringify(dataCalculate1D), 'csv');
	};

	return (
		<Flex vertical className={styles['cutting-1D-download']}>
			<Button type="primary" danger onClick={() => handlerDownloadPDF()}>
				Скачать схему pdf
			</Button>
			<Button danger onClick={() => handlerDownloadCSV()}>
				Скачать схему csv
			</Button>
		</Flex>
	);
};
