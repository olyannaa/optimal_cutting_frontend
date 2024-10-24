export const tableOptions: ITableOptions = {
	detail1D: ['number', 'length', 'count'],
	workpiece: ['number', 'length'],
	detail2D: ['detail', 'count'],
	sizes2D: ['number', 'length', 'weight', 'count'],
};

export const tableOptionsInputs: ITableOptions = {
	detail1D: ['length', 'count'],
	workpiece: ['length'],
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

type ITableOptions = {
	detail1D: ('number' | 'length' | 'count')[];
	workpiece: ('number' | 'length')[];
	detail2D: ('detail' | 'count')[];
	sizes2D: ('number' | 'length' | 'weight' | 'count')[];
};
