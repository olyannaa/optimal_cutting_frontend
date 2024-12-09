import { Button, Flex, Form, Input, Select } from 'antd';
import { TableTypes } from '../../../types/typeTable';
import { Table } from '../../custom-table/Table';
import { useState } from 'react';
import { FormTabs, FormTabsType } from '../../FormTabs/FormTabs';
import { TabsOptions } from '../../FormTabs/tabsOption';
import { FormContainer } from '../../FormContainer/FormContainer';
import multiple from '../../../assets/icons/multiple.svg';
import styles from './Cutting2DForm.module.css';

export const Cutting2DForm = () => {
    const [formDetail] = Form.useForm();
    const [tab, setTab] = useState<TabsOptions>(TabsOptions.valueFirst);
    const [modeBlank, setModeBlank] = useState<TabsOptions>(
        TabsOptions.valueFirst
    );
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
                        <Select placeholder='Выбрать заготовку'></Select>
                    )}
                    {modeBlank === TabsOptions.valueSecond && (
                        <Form className={styles['cutting2D__form-wrapper']}>
                            <Form.Item>
                                <Input
                                    className={styles['cutting2D__input']}
                                ></Input>
                            </Form.Item>
                            <img src={multiple} />
                            <Form.Item>
                                <Input
                                    className={styles['cutting2D__input']}
                                ></Input>
                            </Form.Item>
                        </Form>
                    )}
                    <h2 style={{ marginTop: '44px' }}>Толщина реза</h2>
                    <Input
                        type='number'
                        className={styles['cutting2D__input']}
                    ></Input>
                    <Button type='primary' danger className='bottom-btn'>
                        Создать схему
                    </Button>
                </Flex>
            </FormContainer>
        </Flex>
    );
};
