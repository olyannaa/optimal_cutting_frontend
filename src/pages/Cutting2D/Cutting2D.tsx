import { Flex, Image } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { getPNG2DCuttingFromSizes } from '../../functions/readZipFiles';
import { selectCalculateData2D } from '../../features/cutting2DSlice';
import styles from './Cutting2D.module.css';
export const Cutting2D = () => {
    const dataCalculate2D = useAppSelector(selectCalculateData2D);
    const [images, setImages] = useState<{ name: string; url: string }[]>([]);

    const getPng = async () => {
        if (dataCalculate2D.details.length) {
            const images = await getPNG2DCuttingFromSizes(dataCalculate2D);
            setImages(images);
        }
    };

    useEffect(() => {
        getPng();
    }, [dataCalculate2D]);

    return (
        <Flex vertical style={{ width: '100%' }} className={styles.container}>
            {dataCalculate2D.workpiece &&
                images.map((img) => (
                    <div key={img.name}>
                        <Image src={img.url} preview={false} />
                    </div>
                ))}
        </Flex>
    );
};
