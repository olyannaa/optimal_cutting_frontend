import { Flex, Image, Spin } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { getPNG2DCuttingFromSizes } from '../../functions/readZipFiles';
import { selectCalculateData2D } from '../../features/cutting2DSlice';
import styles from './Cutting2D.module.css';

const contentStyle: React.CSSProperties = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};

const content = <div style={contentStyle} />;

export const Cutting2D = () => {
    const isLoading = useAppSelector((state) => state.statePage.isLoading);
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
        <Flex vertical className={styles.cutting2d}>
            {isLoading && (
                <div className={styles['cutting2d__loading-container']}>
                    <Spin tip='Загружаем...' size='large'>
                        {content}
                    </Spin>
                </div>
            )}
            {dataCalculate2D.workpiece &&
                !isLoading &&
                images.map((img) => (
                    <div key={img.name}>
                        <Image src={img.url} preview={false} />
                    </div>
                ))}
        </Flex>
    );
};
