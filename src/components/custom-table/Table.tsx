import { Button, Flex, Form, Image, Input } from 'antd';
import styles from './Table.module.css';
import { TableRow } from './TableRow/TableRow';
import srcDownload from '../../assets/icons/download.svg';
import srcImport from '../../assets/icons/import.svg';
import { useEffect, useState } from 'react';
import { FormInstance } from 'antd/es/form/Form';
import {
	changeDetails1DDownload,
	changeDetails1DImport,
} from '../../functions/processingDataInput';
import { downloadFileCSV1D } from '../../functions/fetchFiles';
import { useImportFileMutation } from '../../app/services/cutting';
import { ICustomTableRow } from '../../types/CustomTable';
import { CsvError } from './CsvError/CsvError';
import { IError } from '../../types/Error';
import { tableOptionsInputs } from '../const/tableOptions';
import { useAppDispatch } from '../../app/hooks';
import { updateMaxLength } from '../../features/maxLengthWorkpieces';

type Props = {
	typeTable: 'detail1D' | 'workpiece' | 'detail2D' | 'sizes2D';
	form: FormInstance<any>;
};

export const Table = ({ typeTable, form }: Props) => {
	const dispatch = useAppDispatch();
	const [importFile] = useImportFileMutation();
	const initialRow: ICustomTableRow = {
		number: 1,
		detail: '',
	};
	const [rows, setRows] = useState<ICustomTableRow[]>([initialRow]);
	const [error, setError] = useState<string>('');

	useEffect(()=>{
		onChange()
	},[rows])

	const handlerAdd = () => {
		setRows((last) => [
			...last,
			{ ...initialRow, number: last.length + 1 },
		]);
	};

	const onFinish = async (data: any) => {
		if (typeTable === 'detail1D') {
			const details = changeDetails1DDownload(data);
			console.log(details);
			await downloadFileCSV1D(JSON.stringify(details));
		}
	};

	const deleteRow = (num: number) => {
		if (num < rows.length) {
			for (let i = num; i < rows.length; i++) {
				const valuesFieldsCurr = form.getFieldsValue(
					tableOptionsInputs[typeTable].map((el) => `${el}_${i}`)
				);
				const fieldsNext = tableOptionsInputs[typeTable].map(
					(el) => `${el}_${i + 1}`
				);
				const valuesFieldsNext = form.getFieldsValue(fieldsNext);
				form.resetFields(fieldsNext);
				let result = {};
				Object.keys(valuesFieldsCurr).forEach((key, i) => {
					result = {
						...result,
						[key]: Object.values(valuesFieldsNext)[i],
					};
				});
				form.setFieldsValue(result);
			}
		} else {
			form.resetFields(
				tableOptionsInputs[typeTable].map((el) => `${el}_${num}`)
			);
		}
		setRows((last) => {
			const newRows = last.filter((row) => row.number !== num);
			return newRows.map((row, i) => ({ ...row, number: i + 1 }));
		});
	};

	const handlerImportFile = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setError('');
		const files = event.target.files;
		if (files) {
			const formData = new FormData();
			formData.append('file', files[0]);
			try {
				const responseData = await importFile(formData).unwrap();
				if (Object.keys(responseData[0]).length !== 2) {
					setError('colomns');
				}
				setRows(
					responseData.map((_, i) => ({
						number: i + 1,
						detail: '',
					}))
				);
				form.setFieldsValue(changeDetails1DImport(responseData));
			} catch (err) {
				console.log(21);
				if ((err as IError).status === 400) {
					setError('type');
				}
			}
		}
	};

	const onChange = () => {
		if (typeTable === 'workpiece') {
			let data: number[] = Object.values(form.getFieldsValue());
			data = data.filter((el)=>el !== undefined)
			dispatch(updateMaxLength(Math.max(...data)));
		}
	};

	return (
		<Flex vertical className={styles.table}>
			<Flex className={styles['table__title']}>
				{typeTable === 'detail1D'
					? 'Деталь'
					: typeTable === 'workpiece'
					? 'Заготовка'
					: ''}
			</Flex>
			<TableRow
				typeTable={typeTable}
				isHeader
				rowInfo={initialRow}
				deleteRow={() => {}}
			/>
			<Form
				form={form}
				onFinish={onFinish}
				className={`${styles['table__form']} ${
					styles[`table__form_${typeTable}`]
				}`}
				onChange={onChange}
			>
				{rows.map((row, i) => (
					<TableRow
						typeTable={typeTable}
						rowInfo={row}
						key={i}
						deleteRow={deleteRow}
						countRows={rows.length}
					/>
				))}
			</Form>
			<Flex
				className={`${styles['table__buttons']} ${
					styles[`table__buttons_${typeTable}`]
				}`}
			>
				{typeTable !== 'workpiece' && (
					<>
						<Button
							className={styles['btn-download']}
							onClick={form.submit}
						>
							<Image preview={false} src={srcDownload} />
						</Button>
						<Form>
							<Form.Item>
								<label
									htmlFor="input-files"
									className={styles['btn-import']}
								>
									<Image
										preview={false}
										src={srcImport}
										width={'17px'}
										height={'17px'}
										className={styles['btn-import__image']}
									/>
									Импорт
								</label>
								<Input
									className={styles['upload-input']}
									id="input-files"
									type="file"
									name="input-files"
									onChange={handlerImportFile}
								/>
							</Form.Item>
						</Form>
					</>
				)}
				<Button
					className={styles['btn-add']}
					type="primary"
					onClick={() => handlerAdd()}
				>
					Добавить
				</Button>
			</Flex>
			{error && <CsvError error={error} setError={setError} />}
		</Flex>
	);
};
