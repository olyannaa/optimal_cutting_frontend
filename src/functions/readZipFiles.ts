import JSZip from 'jszip';
import { ResultCalculate2D } from '../types/Calculated2D';
import { TabsOptions } from '../components/FormTabs/tabsOption';
import { getHeaders } from './getHeaders';
import { getBaseApi } from './endpoints/FileEndpoints';

export const getPNG2DCuttingFromSizes = async (
    dataCalculate1D: ResultCalculate2D,
    tab: TabsOptions
) => {
    try {
        const response = await fetch(
            `${getBaseApi()}${
                tab === TabsOptions.valueFirst ? 'dxf' : '2d'
            }/export/result/png`,
            {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(dataCalculate1D),
            }
        );

        if (!response.ok) {
            throw new Error('Ошибка при получении данных.');
        }
        const blob = await response.blob();

        // Распаковка ZIP-файла
        const zip = await JSZip.loadAsync(blob);

        // Получение файлов в ZIP
        const images: { name: string; url: string }[] = [];
        for (const [fileName, file] of Object.entries(zip.files)) {
            if (!fileName.endsWith('.png')) continue;
            const content = await file.async('blob');
            const url = URL.createObjectURL(content);
            images.push({ name: fileName, url });
        }

        // Возвращаем массив изображений
        return images;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};
