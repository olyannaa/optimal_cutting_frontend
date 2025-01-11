/** Получение картинок для раскроя по размерам 2D */
export function export2DPng() {
    return `${import.meta.env.VITE_APP_BASE_URL}2d/export/result/png`;
}

/** Скачивание PDF/DXF файлов для 2D раскроя по размерам */
export function export2D() {
    return `${import.meta.env.VITE_APP_BASE_URL}2d/export/result/pdf`;
}

export function dxfExportPng() {
    return `${import.meta.env.VITE_APP_BASE_URL}dxf/export/result/png`;
}

export function dxfExportPdf() {
    return `${import.meta.env.VITE_APP_BASE_URL}dxf/export/result/pdf`;
}
