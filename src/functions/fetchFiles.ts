import { DetailDxf } from '../types/CalculatedDxf';

const headers = new Headers();
headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
headers.set('Content-Type', 'application/json');
export const getPNG1DCutting = async (dataCalculate1D: string) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_APP_BASE_URL}1d/export/result/png`,
            {
                method: 'POST',
                headers: headers,
                body: dataCalculate1D,
            }
        );
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
        const response = await fetch(
            `${import.meta.env.VITE_APP_BASE_URL}1d/export/result/${typeFile}`,
            {
                method: 'POST',
                headers: headers,
                body: dataCalculate1D,
            }
        );
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
        const response = await fetch(
            `${import.meta.env.VITE_APP_BASE_URL}1d/export/csv`,
            {
                method: 'POST',
                headers: headers,
                body: dataDetails,
            }
        );
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
        const response = await fetch(
            `${import.meta.env.VITE_APP_BASE_URL}2d/export/csv`,
            {
                method: 'POST',
                headers: headers,
                body: dataDetails,
            }
        );
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
        const response = await fetch(
            `${import.meta.env.VITE_APP_BASE_URL}2d/export/result/${typeFile}`,
            {
                method: 'POST',
                headers: headers,
                body: dataCalculate2D,
            }
        );
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

export const downloadFileCSVDxfCutting = async (dataDetails: string) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_APP_BASE_URL}dxf/export/csv`,
            {
                method: 'POST',
                headers: headers,
                body: dataDetails,
            }
        );
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
