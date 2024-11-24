import { Flex, Image } from 'antd';
import { FormContainer } from '../../components/FormContainer/FormContainer';
import { FormTabs, FormTabsType } from '../../components/FormTabs/FormTabs';
import { AddDetailForm } from '../../components/forms/AddDXF/AddDetailForm/AddDetailForm';
import { NewWorkpiece } from '../../components/forms/AddDXF/AddNewWorkpiece/AddNewWorkpiece';
import { TabsOptions } from '../../components/FormTabs/tabsOption';
import { useState } from 'react';
import styles from './NewDetail.module.css';

export const NewDetail = () => {
    const [tab, setTab] = useState<TabsOptions>(TabsOptions.valueFirst);
    const [img, setImg] = useState<string>('');
    const props: FormTabsType = {
        tabTitleFirst: 'Добавить деталь',
        tabTitleSecond: 'Новая заготовка',
        setTab: setTab,
        tab: tab,
    };

    return (
        <Flex style={{ width: '100%', height: '100%', display: 'flex' }}>
            <FormContainer>
                <Flex className='formgap'>
                    <FormTabs {...props}></FormTabs>
                    {tab === TabsOptions.valueFirst && (
                        <AddDetailForm setImg={setImg}></AddDetailForm>
                    )}
                    {tab === TabsOptions.valueSecond && (
                        <NewWorkpiece></NewWorkpiece>
                    )}
                </Flex>
            </FormContainer>
            <div className={styles['detail__img-container']}>
                {img && (
                    <Image
                        src={img}
                        preview={false}
                        style={{ width: '100%', height: '100%' }}
                    ></Image>
                )}
            </div>
        </Flex>
    );
};
