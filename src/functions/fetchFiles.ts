import {
    export1DPngEndpoint,
    exportCsv1DEndpoint,
    exportCsv2DEndpoint,
    exportResult1DEndpoint,
    exportResult2DEndpoint,
} from './endpoints/FileEndpoints';
import { getHeaders } from './getHeaders';

export const getPNG1DCutting = async (dataCalculate1D: string) => {
    console.log();
    try {
        const response = await fetch(export1DPngEndpoint(), {
            method: 'POST',
            headers: getHeaders(),
            body: dataCalculate1D,
        });
        if (!response.ok) {
            throw new Error('Ошибка при получении данных.');
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};

export const downloadFile1DCutting = async (
    dataCalculate1D: string,
    typeFile: 'pdf' | 'csv'
) => {
    try {
        const response = await fetch(exportResult1DEndpoint() + typeFile, {
            method: 'POST',
            headers: getHeaders(),
            body: dataCalculate1D,
        });
        if (!response.ok) {
            throw new Error('Ошибка при получении данных.');
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `file.${typeFile}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};

export const downloadFileCSV1D = async (dataDetails: string) => {
    try {
        const response = await fetch(exportCsv1DEndpoint(), {
            method: 'POST',
            headers: getHeaders(),
            body: dataDetails,
        });
        if (!response.ok) {
            throw new Error('Ошибка при получении данных.');
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `details.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};

export const downloadFileCSV2DCutting = async (dataDetails: string) => {
    try {
        const response = await fetch(exportCsv2DEndpoint(), {
            method: 'POST',
            headers: getHeaders(),
            body: dataDetails,
        });
        if (!response.ok) {
            throw new Error('Ошибка при получении данных.');
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `details.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};

export const downloadFile2DCutting = async (
    dataCalculate2D: string,
    typeFile: 'pdf' | 'dxf'
) => {
    try {
        const response = await fetch(exportResult2DEndpoint() + typeFile, {
            method: 'POST',
            headers: getHeaders(),
            body: dataCalculate2D,
        });
        if (!response.ok) {
            throw new Error('Ошибка при получении данных.');
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `file.${typeFile}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};
