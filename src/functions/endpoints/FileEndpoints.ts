/** Получение картинок для раскроя по размерам 2D */
export function export2DPng() {
    return `${import.meta.env.VITE_API_URL}2d/export/result/png`;
}

export function exportResult2DEndpoint() {
    return `${import.meta.env.VITE_API_URL}2d/export/result/`;
}

export function export1DPngEndpoint() {
    return `${import.meta.env.VITE_API_URL}1d/export/result/png`;
}

export function exportResult1DEndpoint() {
    return `${import.meta.env.VITE_API_URL}1d/export/result/`;
}

export function exportCsv1DEndpoint() {
    return `${import.meta.env.VITE_API_URL}1d/export/csv`;
}

export function exportCsv2DEndpoint() {
    return `${import.meta.env.VITE_API_URL}2d/export/csv`;
}
