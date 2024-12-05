import { Designation } from '../app/services/addDxf';

export const checkErrorAddDetails = (arr: Designation[]) => {
	if (arr.length === 0) {
		return false;
	}

	return !arr.every(
		(value) =>
			arr[0].materialId === value.materialId &&
			arr[0].thickness === value.thickness
	);
};
