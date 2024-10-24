const headers = new Headers();
headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
headers.set('Content-Type', 'application/json');
export const getPNG1DCutting = async (dataCalculate1D: string) => {
	try {
		const response = await fetch(
			`https://localhost:5001/1d/export/result/png`,
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
			`https://localhost:5001/1d/export/result/${typeFile}`,
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
		const response = await fetch('https://localhost:5001/1d/export/csv', {
			method: 'POST',
			headers: headers,
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

