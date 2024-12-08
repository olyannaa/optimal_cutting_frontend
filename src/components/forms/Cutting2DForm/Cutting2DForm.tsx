import { Flex, Form, Input, Select } from 'antd';
import { TableTypes } from '../../../types/typeTable';
import { Table } from '../../custom-table/Table';
import { useState } from 'react';
import { FormTabs, FormTabsType } from '../../FormTabs/FormTabs';
import { TabsOptions } from '../../FormTabs/tabsOption';
import { FormContainer } from '../../FormContainer/FormContainer';
import multiple from '../../../assets/icons/multiple.svg';

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
        <Flex style={{ width: '100%', height: '100%', display: 'flex' }}>
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
                    {modeBlank === TabsOptions.valueFirst && <Select></Select>}
                    {modeBlank === TabsOptions.valueSecond && (
                        <Form style={{ display: 'flex' }}>
                            <Form.Item>
                                <Input></Input>
                            </Form.Item>
                            <img src={multiple} />
                            <Form.Item>
                                <Input></Input>
                            </Form.Item>
                        </Form>
                    )}
                    <h2 style={{ marginTop: '44px' }}>Толщина реза</h2>
                    <Input type='number'></Input>
                </Flex>
            </FormContainer>
        </Flex>
    );
};
