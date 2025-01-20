import { Button, Form, InputNumber, Select } from 'antd';
import { TableTypes } from '../../../types/typeTable';
import { Table } from '../../custom-table/Table';
import { useEffect, useState } from 'react';
import { FormTabs, FormTabsType } from '../../FormTabs/FormTabs';
import { TabsOptions } from '../../FormTabs/tabsOption';
import { FormContainer } from '../../FormContainer/FormContainer';
import multiple from '../../../assets/icons/multiple.svg';
import styles from './Cutting2DForm.module.css';
import {
    useCalculate2DMutation,
    useCalculateDxfMutation,
    useGetWorkpiecesQuery,
} from '../../../app/services/cutting2d';
import { ICalculate2D, RequestWorkpiece } from '../../../types/Calculated2D';
import {
    changeDetailsDxfCalculate,
    getListDetails2D,
} from '../../../functions/processingDataInput';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeTab, setLoading } from '../../../features/statePageSlice';
import { ICalculateDxf } from '../../../types/CalculatedDxf';
import { selectRowsTable, updateRows } from '../../../features/rowsTableSlice';
import { resetCutting2D } from '../../../features/cutting2DSlice';
import { clearAddDetails } from '../../../features/selectDetails2DSlice';

export const Cutting2DForm = () => {
    const dispatch = useAppDispatch();
    const dataRows = useAppSelector(selectRowsTable);
    const [formDetail2D] = Form.useForm();
    const [formDetailDxf] = Form.useForm();
    const [formStandardWorkpiece] = Form.useForm();
    const [formCustomWorkpiece] = Form.useForm();
    const [formThickness] = Form.useForm();
    const [getCalculate2D, { isLoading: isLoading2D }] = useCalculate2DMutation();
    const [getCalculateDxf, { isLoading: isLoadingDxf }] = useCalculateDxfMutation();
    const requiredRule = [{ required: true, message: '' }];
    const [tab, setTab] = useState<TabsOptions>(TabsOptions.valueFirst);
    const [modeBlank, setModeBlank] = useState<TabsOptions>(TabsOptions.valueFirst);
    const { data } = useGetWorkpiecesQuery();

    const workpieces: Array<{ value: number; label: string }> = data
        ? data.map((key) => {
              const item = {
                  value: key.id,
                  label: `${key.name} ${key.width}x${key.height}`,
              };
              return item;
          })
        : [];

    const findHeightAndWidth = (id: number): RequestWorkpiece | undefined => {
        if (!data) return undefined;

        const workpiece = data.find((key) => key.id === id);
        if (workpiece) {
            return {
                height: workpiece.height,
                width: workpiece.width,
            };
        }

        return undefined;
    };

    const generateResult = async () => {
        let isValidatedForms2D = false;
        let isValidatedFormsDxf = false;
        if (tab === TabsOptions.valueFirst)
            await formDetailDxf
                .validateFields()
                .then(() => (isValidatedFormsDxf = true))
                .catch(() => (isValidatedFormsDxf = false));
        if (tab === TabsOptions.valueSecond)
            await formDetail2D
                .validateFields()
                .then(() => (isValidatedForms2D = true))
                .catch(() => (isValidatedForms2D = false));
        await formStandardWorkpiece
            .validateFields()
            .then()
            .catch(() => {
                isValidatedForms2D = false;
                isValidatedFormsDxf = false;
            });
        await formThickness
            .validateFields()
            .then()
            .catch(() => {
                isValidatedForms2D = false;
                isValidatedFormsDxf = false;
            });
        await formCustomWorkpiece
            .validateFields()
            .then()
            .catch(() => {
                isValidatedForms2D = false;
                isValidatedFormsDxf = false;
            });
        if (isValidatedForms2D && tab === TabsOptions.valueSecond) {
            dispatch(setLoading(true));
            let data: ICalculate2D = {
                details: getListDetails2D(formDetail2D.getFieldsValue()),
                workpiece: { width: 0, height: 0 },
                cuttingThickness: formThickness.getFieldValue('cuttingThickness'),
            };
            if (modeBlank === TabsOptions.valueFirst) {
                data = {
                    ...data,
                    workpiece: findHeightAndWidth(
                        formStandardWorkpiece.getFieldValue('workpiece')
                    ) ?? { width: 0, height: 0 },
                };
            } else {
                data = {
                    ...data,
                    workpiece: {
                        width: Number(formCustomWorkpiece.getFieldValue('width')),
                        height: Number(formCustomWorkpiece.getFieldValue('length')),
                    },
                };
            }
            try {
                await getCalculate2D(data).unwrap();
            } finally {
                dispatch(setLoading(false));
            }
        }

        if (isValidatedFormsDxf && tab === TabsOptions.valueFirst) {
            dispatch(setLoading(true));
            let data: ICalculateDxf = {
                detailsId: changeDetailsDxfCalculate(
                    formDetailDxf.getFieldsValue(),
                    dataRows
                ),
                workpiece: { width: 0, height: 0 },
                cuttingThickness: formThickness.getFieldValue('cuttingThickness'),
            };
            if (modeBlank === TabsOptions.valueFirst) {
                data = {
                    ...data,
                    workpiece: findHeightAndWidth(
                        formStandardWorkpiece.getFieldValue('workpiece')
                    ) ?? { width: 0, height: 0 },
                };
            } else {
                data = {
                    ...data,
                    workpiece: {
                        width: Number(formCustomWorkpiece.getFieldValue('width')),
                        height: Number(formCustomWorkpiece.getFieldValue('length')),
                    },
                };
            }
            try {
                await getCalculateDxf(data).unwrap();
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    const propsMode: FormTabsType = {
        tabTitleFirst: 'Выбрать детали',
        tabTitleSecond: 'Ввести размеры',
        setTab: setTab,
        tab: tab,
    };
    const propsSelect: FormTabsType = {
        tabTitleFirst: 'Станд. заготовка',
        tabTitleSecond: 'Ввести размеры',
        setTab: setModeBlank,
        tab: modeBlank,
    };

    useEffect(() => {
        if (tab === TabsOptions.valueFirst) formDetailDxf.resetFields();
        else formDetail2D.resetFields();
        if (modeBlank === TabsOptions.valueFirst) formStandardWorkpiece.resetFields();
        else formCustomWorkpiece.resetFields();
        formThickness.resetFields();
        dispatch(resetCutting2D());
        dispatch(clearAddDetails());
        dispatch(updateRows([]));
        dispatch(changeTab(tab));
    }, [tab]);

    return (
        <FormContainer>
            <div className='formgap'>
                <h2>Детали</h2>
                <FormTabs {...propsMode} />
                {tab === TabsOptions.valueFirst && (
                    <Table typeTable={TableTypes.detail2D} form={formDetailDxf} />
                )}
                {tab === TabsOptions.valueSecond && (
                    <Table typeTable={TableTypes.sizes2D} form={formDetail2D} />
                )}
                <h2 style={{ marginTop: '38px' }}>Заготовка</h2>
                <FormTabs {...propsSelect}></FormTabs>
                {modeBlank === TabsOptions.valueFirst && (
                    <Form form={formStandardWorkpiece}>
                        <Form.Item name='workpiece' rules={requiredRule}>
                            <Select
                                style={{ width: '90%' }}
                                placeholder='Выбрать заготовку'
                                options={workpieces}
                            />
                        </Form.Item>
                    </Form>
                )}
                {modeBlank === TabsOptions.valueSecond && (
                    <Form
                        form={formCustomWorkpiece}
                        className={styles['cutting2D__form-wrapper']}
                    >
                        <Form.Item
                            name='length'
                            rules={requiredRule}
                            style={{ marginBottom: 0 }}
                        >
                            <InputNumber
                                min={0}
                                className={styles['cutting2D__input']}
                            ></InputNumber>
                        </Form.Item>
                        <img width={16} src={multiple} />
                        <Form.Item
                            name='width'
                            rules={requiredRule}
                            style={{ marginBottom: 0 }}
                        >
                            <InputNumber
                                min={0}
                                className={styles['cutting2D__input']}
                            ></InputNumber>
                        </Form.Item>
                    </Form>
                )}
                <h2 style={{ marginTop: '38px' }}>Толщина реза</h2>
                <Form form={formThickness} style={{ marginBottom: '28px' }}>
                    <Form.Item name='cuttingThickness' rules={requiredRule}>
                        <InputNumber
                            className={styles['cutting2D__input']}
                            size={'middle'}
                            min={0}
                            controls
                            step={0.1}
                        />
                    </Form.Item>
                </Form>
                <div className='btn__container'>
                    <Button
                        type='primary'
                        danger
                        className='btn-bottom'
                        onClick={generateResult}
                        loading={isLoading2D || isLoadingDxf}
                    >
                        Создать схему
                    </Button>
                </div>
            </div>
        </FormContainer>
    );
};
