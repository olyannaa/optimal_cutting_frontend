import { Flex, Form, Radio, RadioChangeEvent, Select } from 'antd';
import { TableTypes } from '../../../types/typeTable';
import { Table } from '../../custom-table/Table';
import { useState } from 'react';
import styles from './Cutting2DForm.module.css';
type ModeOptionsBlank = 'standard' | 'custom';
type ModeOptionsDetail = 'select' | 'custom';
enum ModeOptions {
    blank = 'blank',
    detail = 'detail',
}

export const Cutting2DForm = () => {
    const [formDetail] = Form.useForm();
    const [modeBlank, setModeBlank] = useState<ModeOptionsBlank>('standard');
    const [modeDetail, setModeDetail] = useState<ModeOptionsDetail>('select');

    const handleModeChange = (mode: ModeOptions, e: RadioChangeEvent) => {
        if (mode === ModeOptions.blank) {
            setModeBlank(e.target.value);
        } else {
            setModeDetail(e.target.value);
        }
    };
    return (
        <Flex className={styles['cutting-form']}>
            <h2>Детали</h2>
            <Radio.Group
                onChange={(e) => handleModeChange(ModeOptions.detail, e)}
                value={modeDetail}
                style={{ marginBottom: 8, display: 'flex' }}
            >
                <Radio.Button value='standard'>
                    Выбрать&nbsp;детали
                </Radio.Button>
                <Radio.Button value='custom'>Ввести&nbsp;размеры</Radio.Button>
            </Radio.Group>
            <Table typeTable={TableTypes.detail2D} form={formDetail} />
            <h2 style={{ marginTop: '44px' }}>Заготовка</h2>
            <Radio.Group
                onChange={(e) => handleModeChange(ModeOptions.blank, e)}
                value={modeBlank}
                style={{ marginBottom: 8, display: 'flex' }}
            >
                <Radio.Button value='standard'>
                    Станд.&nbsp;заготовка
                </Radio.Button>
                <Radio.Button value='custom'>Ввести&nbsp;размеры</Radio.Button>
            </Radio.Group>
            <Select></Select>
        </Flex>
    );
};
