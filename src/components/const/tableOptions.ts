import { TableTypes } from '../../types/typeTable';

type ITableOptions = {
    [TableTypes.detail1D]: ('number' | 'length' | 'count')[];
    [TableTypes.workpieces]: ('number' | 'length')[];
    [TableTypes.detail2D]: ('detail' | 'count')[];
    [TableTypes.sizes2D]: ('number' | 'length' | 'weight' | 'count')[];
};

export const tableOptions: ITableOptions = {
    detail1D: ['number', 'length', 'count'],
    workpieces: ['number', 'length'],
    detail2D: ['detail', 'count'],
    sizes2D: ['number', 'length', 'weight', 'count'],
};

export const tableOptionsInputs: ITableOptions = {
    detail1D: ['length', 'count'],
    workpieces: ['length'],
    detail2D: ['count'],
    sizes2D: ['length', 'weight', 'count'],
};

export const nameColumns = {
    number: '№',
    length: 'Длина',
    weight: 'Ширина',
    count: 'К-во',
    detail: 'Деталь',
};
