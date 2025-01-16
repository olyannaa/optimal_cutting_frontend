import { ResponseImportFile } from '../app/services/cutting';
import { Detail2D } from '../types/Calculated2D';
import { DetailDxf } from '../types/CalculatedDxf';
import { ICustomTableRow } from '../types/CustomTable';

type dataInputsType = {
    [key: string]: string;
};

const divisionArray1D = (dataInputs: dataInputsType) => {
    const length: number[] = [];
    const count: number[] = [];
    Object.keys(dataInputs).forEach((key) => {
        const parseKey = key.split('_');
        if (parseKey[0] === 'length') length.push(Number(dataInputs[key]));
        else if (parseKey[0] === 'count') count.push(Number(dataInputs[key]));
    });
    return {
        length: length,
        count: count,
    };
};

export const changeDetails1DDownload = (dataInputs: dataInputsType) => {
    const arrays = divisionArray1D(dataInputs);
    const result = arrays.count.map((el, i) => {
        return {
            length: arrays.length[i],
            count: el,
        };
    });
    return result;
};

export const changeDetails1DCalculate = (dataInputs: dataInputsType) => {
    const arrays = divisionArray1D(dataInputs);
    const details: number[] = [];
    arrays.count.forEach((el, i) => {
        for (let _ = 0; _ < el; _++) {
            details.push(arrays.length[i]);
        }
    });
    return details;
};

export const changeWorkpiece1DCalculate = (dataInputs: dataInputsType) => {
    const workpiecesLength: number[] = [];
    Object.keys(dataInputs).forEach((key) => {
        workpiecesLength.push(Number(dataInputs[key]));
    });
    return workpiecesLength;
};

export const changeDetails1DImport = (
    dataFile: ResponseImportFile,
    startIndex: number
) => {
    let result: { [key: string]: number } = {};
    dataFile.forEach((el, i) => {
        result = { ...result, [`count_${i + 1 + startIndex}`]: el.count };
        result = { ...result, [`length_${i + 1 + startIndex}`]: el.length };
    });
    return result;
};

const division2DArray = (dataInputs: dataInputsType) => {
    const width: number[] = [];
    const height: number[] = [];
    const count: number[] = [];
    Object.keys(dataInputs).forEach((key) => {
        const parseKey = key.split('_');
        if (parseKey[0] === 'width') width.push(Number(dataInputs[key]));
        else if (parseKey[0] === 'length') height.push(Number(dataInputs[key]));
        else if (parseKey[0] === 'count') count.push(Number(dataInputs[key]));
    });
    return {
        width: width,
        height: height,
        count: count,
    };
};

export const getListDetails2D = (dataInputs: dataInputsType): Detail2D[] => {
    const arrays = division2DArray(dataInputs);
    const result = arrays.count.map((el, i) => {
        return {
            width: arrays.width[i],
            height: arrays.height[i],
            count: el,
        };
    });

    return result;
};

export const changeDetails2DImport = (dataFile: Detail2D[], startIndex: number) => {
    let result: { [key: string]: number } = {};
    dataFile.forEach((el, i) => {
        result = { ...result, [`count_${i + 1 + startIndex}`]: el.count };
        result = { ...result, [`width_${i + 1 + startIndex}`]: el.width };
        result = { ...result, [`length_${i + 1 + startIndex}`]: el.height };
    });
    return result;
};

export const changeDetailsDxfCalculate = (
    dataInputs: dataInputsType,
    dataRows: ICustomTableRow[]
) => {
    const result: number[] = [];
    Object.values(dataRows).forEach((el) => {
        for (let i = 0; i < Number(dataInputs[`count_${el.number}`]); i++) {
            result.push(el.id || 0);
        }
    });
    return result;
};

export const changeDetailsDxfExport = (
    dataInputs: dataInputsType,
    dataRows: ICustomTableRow[]
) => {
    const result: DetailDxf[] = Object.values(dataRows).map((el) => {
        const detail: DetailDxf = {
            id: el.id || 0,
            designation: el.detail || '',
            count: Number(dataInputs[`count_${el.number}`]),
            materialId: el.materialId || 0,
            thickness: el.thickness || 0,
        };
        return detail;
    });
    return result;
};

export const changeDetailsDxfImport = (dataFile: DetailDxf[], startIndex: number) => {
    let result: { [key: string]: number } = {};
    dataFile.forEach((el, i) => {
        result = { ...result, [`count_${i + 1 + startIndex}`]: el.count };
    });
    return result;
};

export const changeFieldsDxfImport = (
    fieldsValues: { [key: string]: number },
    numberDetails: { number: number; count: number }[]
) => {
    numberDetails.forEach((el) => {
        const count = fieldsValues[`count_${el.number}`];
        fieldsValues[`count_${el.number}`] = count ? count + el.count : el.count;
    });
    return fieldsValues;
};
