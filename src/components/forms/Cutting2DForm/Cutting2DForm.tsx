import { Button, Flex, Form, Input, Select } from 'antd';
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
import { ICalculate2D } from '../../../types/Calculated2D';
import { getPNG2DCuttingFromSizes } from '../../../functions/readZipFiles';

export const Cutting2DForm = () => {
    const [formDetail] = Form.useForm();
    const [formStandardWorkpiece] = Form.useForm();
    const [formCustomWorkpiece] = Form.useForm();
    const [formThickness] = Form.useForm();
    const [getCalculate2D] = useCalculate2DMutation();
    const [tab, setTab] = useState<TabsOptions>(TabsOptions.valueFirst);
    const [modeBlank, setModeBlank] = useState<TabsOptions>(
        TabsOptions.valueFirst
    );
    const [images, setImages] = useState<{ name: string; url: string }[]>([]);
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
            const data: ICalculate2D = {
                details: [
                    {
                        width: 100,
                        height: 100,
                        count: 3,
                    },
                ],
                workpieceId: formStandardWorkpiece.getFieldValue('workpiece'),
                cuttingThickness:
                    formThickness.getFieldValue('cuttingThickness'),
            };
            console.log(data);
            const response = await getCalculate2D(data);
            if (response.data) {
                const images = getPNG2DCuttingFromSizes(response.data);
                images.then((data) => {
                    setImages(data);
                });
            }
        }
    };

    const propsMode: FormTabsType = {
        tabTitleFirst: 'Добавить деталь',
        tabTitleSecond: 'Новая заготовка',
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
        <Flex className={styles['cutting2D']}>
            <FormContainer>
                <Flex className='formgap'>
                    <h2>Детали</h2>
                    <FormTabs {...propsMode}></FormTabs>
                    {tab === TabsOptions.valueFirst && (
                        <Table
                            typeTable={TableTypes.detail2D}
                            form={formDetail}
                        />
                    )}
                    {tab === TabsOptions.valueSecond && (
                        <Table
                            typeTable={TableTypes.sizes2D}
                            form={formDetail}
                        />
                    )}
                    <h2 style={{ marginTop: '44px' }}>Заготовка</h2>
                    <FormTabs {...propsSelect}></FormTabs>
                    {modeBlank === TabsOptions.valueFirst && (
                        <Form form={formStandardWorkpiece}>
                            <Form.Item name='workpiece'>
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder='Выбрать заготовку'
                                    options={workpieces}
                                ></Select>
                            </Form.Item>
                        </Form>
                    )}
                    {modeBlank === TabsOptions.valueSecond && (
                        <Form
                            form={formCustomWorkpiece}
                            className={styles['cutting2D__form-wrapper']}
                        >
                            <Form.Item>
                                <Input
                                    name='height'
                                    className={styles['cutting2D__input']}
                                ></Input>
                            </Form.Item>
                            <img src={multiple} />
                            <Form.Item>
                                <Input
                                    name='width'
                                    className={styles['cutting2D__input']}
                                ></Input>
                            </Form.Item>
                        </Form>
                    )}
                    <h2 style={{ marginTop: '44px' }}>Толщина реза</h2>
                    <Form form={formThickness}>
                        <Form.Item name='cuttingThickness'>
                            <Input
                                type='number'
                                className={styles['cutting2D__input']}
                            ></Input>
                        </Form.Item>
                    </Form>
                    <Button
                        type='primary'
                        danger
                        className='bottom-btn'
                        onClick={generateResult}
                    >
                        Создать схему
                    </Button>
                </Flex>
            </FormContainer>
            {images && images.map((img) => <img src={img.url}></img>)}
        </Flex>
    );
};
