import { DetailCoordinates } from '../types/Calculated2D';

export const changeFormatSize = (data: DetailCoordinates[]) => {
    let result = '';
    data.forEach((el) => {
        result += `(${el.width}, ${el.height}) `;
    });
    return result;
};
