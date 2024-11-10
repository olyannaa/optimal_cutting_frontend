import { Flex } from 'antd';
import { FormContainer } from '../FormContainer/FormContainer';
import { useState } from 'react';
import { AddDetailForm } from '../forms/AddDXF/AddDetailForm/AddDetailForm';
import { NewWorkpiece } from '../forms/AddDXF/AddNewWorkpiece/AddNewWorkpiece';
import { FormTabs, FormTabsType } from '../FormTabs/FormTabs';
import { TabsOptions } from '../FormTabs/tabsOption';

export const AddDetailsContainer = () => {
    const [tab, setTab] = useState<TabsOptions>(TabsOptions.valueFirst);
    const props: FormTabsType = {
        tabTitleFirst: 'Добавить деталь',
        tabTitleSecond: 'Новая заготовка',
        setTab: setTab,
        tab: tab,
    };
    return (
        <FormContainer>
            <Flex className='formgap'>
                <FormTabs {...props}></FormTabs>
                <>
                    {tab === TabsOptions.valueFirst && (
                        <AddDetailForm></AddDetailForm>
                    )}
                    {tab === TabsOptions.valueSecond && (
                        <NewWorkpiece></NewWorkpiece>
                    )}
                </>
            </Flex>
        </FormContainer>
    );
};
