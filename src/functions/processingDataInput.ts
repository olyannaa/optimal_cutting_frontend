import { ResponseImportFile } from '../app/services/cutting';

type dataInputsType = {
	[key: string]: string;
};

const divisionArray = (dataInputs: dataInputsType) => {
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
	const arrays = divisionArray(dataInputs);
	const result = arrays.count.map((el, i) => {
		return {
			length: arrays.length[i],
			count: el,
		};
	});
	return result;
};

export const changeDetails1DCalculate = (dataInputs: dataInputsType) => {
	const arrays = divisionArray(dataInputs);
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

export const changeDetails1DImport = (dataFile: ResponseImportFile) => {
	let result: { [key: string]: number } = {};
	dataFile.forEach((el, i) => {
		result = { ...result, [`count_${i + 1}`]: el.count };
		result = { ...result, [`length_${i + 1}`]: el.length };
	});
	return result;
};
