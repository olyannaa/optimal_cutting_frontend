import { Button, Form, Input, InputNumber, Select } from 'antd';
import { TableTypes } from '../../../types/typeTable';
import { Table } from '../../custom-table/Table';
import { useState } from 'react';
import { FormTabs, FormTabsType } from '../../FormTabs/FormTabs';
import { TabsOptions } from '../../FormTabs/tabsOption';
import { FormContainer } from '../../FormContainer/FormContainer';
import multiple from '../../../assets/icons/multiple.svg';
import styles from './Cutting2DForm.module.css';
import {
    useCalculate2DMutation,
    useGetWorkpiecesQuery,
} from '../../../app/services/cutting2d';
import { ICalculate2D, RequestWorkpiece } from '../../../types/Calculated2D';
import { getListDetails2D } from '../../../functions/processingDataInput';
import { useAppDispatch } from '../../../app/hooks';
import { setLoading } from '../../../features/statePageSlice';

export const Cutting2DForm = () => {
    const dispatch = useAppDispatch();
    const [formDetail] = Form.useForm();
    const [formStandardWorkpiece] = Form.useForm();
    const [formCustomWorkpiece] = Form.useForm();
    const [formThickness] = Form.useForm();
    const [getCalculate2D, { isLoading }] = useCalculate2DMutation();
    const [tab, setTab] = useState<TabsOptions>(TabsOptions.valueFirst);
    const [modeBlank, setModeBlank] = useState<TabsOptions>(
        TabsOptions.valueFirst
    );
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
        let isValidatedForms = false;
        await formDetail
            .validateFields()
            .then(() => (isValidatedForms = true))
            .catch(() => (isValidatedForms = false));
        await formStandardWorkpiece
            .validateFields()
            .then()
            .catch(() => (isValidatedForms = false));
        await formThickness
            .validateFields()
            .then()
            .catch(() => (isValidatedForms = false));
        if (isValidatedForms) {
            dispatch(setLoading(true));
            let data: ICalculate2D = {
                details: getListDetails2D(formDetail.getFieldsValue()),
                workpiece: { width: 0, height: 0 },
                cuttingThickness:
                    formThickness.getFieldValue('cuttingThickness'),
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
                        width: Number(
                            formCustomWorkpiece.getFieldValue('width')
                        ),
                        height: Number(
                            formCustomWorkpiece.getFieldValue('length')
                        ),
                    },
                };
            }
            try {
                await getCalculate2D(data).unwrap();
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
    return (
        <FormContainer>
            <div className='formgap'>
                <h2>Детали</h2>
                <FormTabs {...propsMode} />
                {tab === TabsOptions.valueFirst && (
                    <Table typeTable={TableTypes.detail2D} form={formDetail} />
                )}
                {tab === TabsOptions.valueSecond && (
                    <Table typeTable={TableTypes.sizes2D} form={formDetail} />
                )}
                <h2 style={{ marginTop: '38px' }}>Заготовка</h2>
                <FormTabs {...propsSelect}></FormTabs>
                {modeBlank === TabsOptions.valueFirst && (
                    <Form form={formStandardWorkpiece}>
                        <Form.Item name='workpiece'>
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
                        <Form.Item name='length'>
                            <Input
                                className={styles['cutting2D__input']}
                            ></Input>
                        </Form.Item>
                        <img src={multiple} />
                        <Form.Item name='width'>
                            <Input
                                className={styles['cutting2D__input']}
                            ></Input>
                        </Form.Item>
                    </Form>
                )}
                <h2 style={{ marginTop: '38px' }}>Толщина реза</h2>
                <Form form={formThickness} style={{ marginBottom: '28px' }}>
                    <Form.Item name='cuttingThickness'>
                        <InputNumber
                            className={styles['cutting2D__input']}
                            size={'middle'}
                            min={0}
                            controls
                            defaultValue={0.3}
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
                        loading={isLoading}
                    >
                        Создать схему
                    </Button>
                </div>
            </div>
        </FormContainer>
    );
};
