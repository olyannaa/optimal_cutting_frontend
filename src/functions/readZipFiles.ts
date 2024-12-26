import JSZip from 'jszip';
import { ResultCalculate2D } from '../types/Calculated2D';

const headers = new Headers();
headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
headers.set('Content-Type', 'application/json');

export const getPNG2DCuttingFromSizes = async (
    dataCalculate1D: ResultCalculate2D
) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_APP_BASE_URL}2d/export/result/png`,
            {
                method: 'POST',
                headers: headers,
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
            if (!fileName.endsWith('.png')) continue; // Фильтруем только изображения
            const content = await file.async('blob'); // Извлекаем содержимое файла как Blob
            const url = URL.createObjectURL(content); // Создаем URL для отображения
            images.push({ name: fileName, url });
        }

        // Возвращаем массив изображений
        return images;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};
