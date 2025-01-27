/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Form } from 'antd';
import styles from './Table.module.css';
import { TableRow } from './TableRow/TableRow';
import { useEffect, useState } from 'react';
import { FormInstance } from 'antd/es/form/Form';
import {
    changeDetails1DDownload,
    changeDetails1DImport,
    changeDetails2DImport,
    changeDetailsDxfExport,
    changeDetailsDxfImport,
    changeFieldsDxfImport,
    getListDetails2D,
} from '../../functions/processingDataInput';
import {
    downloadFileCSV1D,
    downloadFileCSV2DCutting,
    downloadFileCSVDxfCutting,
} from '../../functions/fetchFiles';
import { useImportFile1DMutation } from '../../app/services/cutting';
import { ICustomTableRow } from '../../types/CustomTable';
import { CsvError } from './CsvError/CsvError';
import { IError } from '../../types/Error';
import { tableOptionsInputs } from '../../const/tableOptions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TableTypes } from '../../types/typeTable';
import { ErrorsCsv } from '../../types/typeErrorsCsv';
import { DownloadButton } from '../buttons/DownloadButton';
import { ImportButton } from '../buttons/ImportButton/ImportButton';
import { ModalSelectDetails } from '../ModalSelectDetails/ModalSelectDetails';
import {
    addAddedDetails,
    deleteAddedDetail,
    selectAddedDetails,
} from '../../features/selectDetails2DSlice';
import {
    useImportFile2DMutation,
    useImportFileDxfMutation,
} from '../../app/services/cutting2d';
import { updateRows } from '../../features/rowsTableSlice';
import { DetailDxf } from '../../types/CalculatedDxf';

type Props = {
    typeTable: TableTypes;
    form: FormInstance<any>;
};

export const Table = ({ typeTable, form }: Props) => {
    const dispatch = useAppDispatch();
    const [importFile1D] = useImportFile1DMutation();
    const [importFile2D] = useImportFile2DMutation();
    const [importFileDxf] = useImportFileDxfMutation();
    const initialRow: ICustomTableRow =
        typeTable === TableTypes.detail2D
            ? { number: 1 }
            : {
                  number: 1,
                  detail: '',
                  id: 0,
                  materialId: 0,
                  thickness: 0,
              };
    const [rows, setRows] = useState<ICustomTableRow[]>(
        TableTypes.detail2D === typeTable ? [] : [initialRow]
    );
    const [error, setError] = useState<ErrorsCsv | null>(null);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const addedDetails = useAppSelector(selectAddedDetails);

    useEffect(() => {
        if (typeTable === TableTypes.detail2D) {
            dispatch(updateRows(rows));
        }
    }, [rows]);

    useEffect(() => {
        if (typeTable === TableTypes.detail2D) {
            setRows((last) => {
                Object.values(addedDetails).forEach((values) => {
                    for (let i = 1; i <= values.length; i++) {
                        if (!last.find((el) => el.detail === values[i - 1].designation))
                            last = [
                                ...last,
                                {
                                    number: last.length + 1,
                                    detail: values[i - 1].designation,
                                    id: values[i - 1].id,
                                    materialId: values[i - 1].materialId,
                                    thickness: values[i - 1].thickness,
                                },
                            ];
                    }
                });
                return last;
            });
        }
    }, [addedDetails]);
    const handlerAdd = () => {
        if (
            typeTable === TableTypes.detail1D ||
            typeTable === TableTypes.workpieces ||
            typeTable === TableTypes.sizes2D
        ) {
            setRows((last) => [...last, { ...initialRow, number: last.length + 1 }]);
        }
        if (typeTable === TableTypes.detail2D) {
            setIsOpenModal(true);
        }
    };

    const onFinish = async (data: any) => {
        if (typeTable === TableTypes.detail1D) {
            const details = changeDetails1DDownload(data);
            await downloadFileCSV1D(JSON.stringify(details));
        } else if (typeTable === TableTypes.sizes2D) {
            const details = getListDetails2D(data);
            await downloadFileCSV2DCutting(JSON.stringify(details));
        } else if (typeTable === TableTypes.detail2D) {
            const details = changeDetailsDxfExport(form.getFieldsValue(), rows);
            await downloadFileCSVDxfCutting(JSON.stringify(details));
        }
    };

    const deleteRow = (num: number, detail: string) => {
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
            form.resetFields(tableOptionsInputs[typeTable].map((el) => `${el}_${num}`));
        }
        setRows((last) => {
            const newRows = last.filter((row) => row.number !== num);
            return newRows.map((row, i) => ({ ...row, number: i + 1 }));
        });
        if (typeTable === TableTypes.detail2D) {
            dispatch(deleteAddedDetail(detail));
        }
    };

    const handlerImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const files = event.target.files;
        if (files) {
            const formData = new FormData();
            formData.append('file', files[0]);
            try {
                if (typeTable === TableTypes.sizes2D) {
                    const responseData = await importFile2D(formData).unwrap();
                    if (Object.keys(responseData[0]).length !== 3) {
                        setError(ErrorsCsv.columns);
                    }
                    setRows((last) => {
                        const lengthLast = last.length;
                        for (let i = 1; i <= responseData.length; i++) {
                            last = [...last, { number: lengthLast + i }];
                        }

                        form.setFieldsValue({
                            ...form.getFieldsValue(),
                            ...changeDetails2DImport(responseData, lengthLast),
                        });
                        return last;
                    });
                } else if (typeTable === TableTypes.detail1D) {
                    const responseData = await importFile1D(formData).unwrap();
                    if (Object.keys(responseData[0]).length !== 2) {
                        setError(ErrorsCsv.columns);
                    }
                    setRows((last) => {
                        const lengthLast = last.length;
                        for (let i = 1; i <= responseData.length; i++) {
                            last = [...last, { number: lengthLast + i }];
                        }

                        form.setFieldsValue({
                            ...form.getFieldsValue(),
                            ...changeDetails1DImport(responseData, lengthLast),
                        });
                        return last;
                    });
                } else if (typeTable === TableTypes.detail2D) {
                    const filterResponseData: DetailDxf[] = [];
                    const responseData = await importFileDxf(formData).unwrap();
                    if (Object.keys(responseData[0]).length !== 5) {
                        setError(ErrorsCsv.columns);
                    } else if (
                        rows.length !== 0 &&
                        (rows[0].materialId !== responseData[0].materialId ||
                            rows[0].thickness !== responseData[0].thickness)
                    ) {
                        setError(ErrorsCsv.material);
                    } else {
                        const currRows = rows;
                        let number = 1;
                        const lengthLast = currRows.length;
                        const numberDetails: {
                            number: number;
                            count: number;
                        }[] = [];
                        for (let i = 1; i <= responseData.length; i++) {
                            const index = currRows.findIndex(
                                (detail) => detail.id === responseData[i - 1].id
                            );
                            if (index !== -1) {
                                numberDetails.push({
                                    number: currRows[index].number,
                                    count: responseData[i - 1].count,
                                });
                            } else {
                                filterResponseData.push(responseData[i - 1]);
                                currRows.push({
                                    number: lengthLast + number,
                                    detail: responseData[i - 1].designation,
                                    id: responseData[i - 1].id,
                                    materialId: responseData[i - 1].materialId,
                                    thickness: responseData[i - 1].thickness,
                                });
                                number += 1;
                            }
                        }
                        form.setFieldsValue({
                            ...changeFieldsDxfImport(
                                form.getFieldsValue(),
                                numberDetails
                            ),
                            ...changeDetailsDxfImport(filterResponseData, lengthLast),
                        });
                        setRows(() => currRows);
                        dispatch(addAddedDetails(filterResponseData));
                        dispatch(updateRows(currRows));
                    }
                }
            } catch (err) {
                if ((err as IError).status === 400) {
                    setError(ErrorsCsv.type);
                }
            }
        }
    };

    return (
        <>
            <Flex vertical className={styles.table}>
                <h2 className={styles['table__title']}>
                    {typeTable === TableTypes.detail1D
                        ? 'Деталь'
                        : typeTable === TableTypes.workpieces
                        ? 'Заготовка'
                        : ''}
                </h2>
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
                    {typeTable !== TableTypes.workpieces && (
                        <>
                            <DownloadButton submit={form.submit} />
                            <Form>
                                <ImportButton
                                    name='input-files'
                                    onChange={handlerImportFile}
                                />
                            </Form>
                        </>
                    )}
                    <Button
                        className={styles['btn-add']}
                        type='primary'
                        onClick={() => handlerAdd()}
                    >
                        Добавить
                    </Button>
                </Flex>
                {error !== null && <CsvError error={error} setError={setError} />}
            </Flex>
            <ModalSelectDetails isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
        </>
    );
};
