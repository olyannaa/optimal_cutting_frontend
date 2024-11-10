import { Radio, RadioChangeEvent } from 'antd';
import { TabsOptions } from './tabsOption';

export type FormTabsType = {
    tabTitleFirst: string;
    tabTitleSecond: string;
    setTab: (value: TabsOptions) => void;
    tab: TabsOptions;
};

/**
 * Данный компонент используется для переключения 2-х сущностей.
 * Принимает в себя название для первого таба, для второго,
 * функцию для изменения состояния
 * и текущее состояние
 */
export const FormTabs = ({
    tabTitleFirst,
    tabTitleSecond,
    setTab,
    tab,
}: FormTabsType) => {
    const handleModeChange = (e: RadioChangeEvent) => {
        setTab(e.target.value);
    };
    return (
        <div>
            <Radio.Group
                onChange={(e) => handleModeChange(e)}
                value={tab}
                style={{
                    display: 'flex',
                    padding: 2,
                    background: 'rgba(217, 217, 217, 1)',
                    border: 'none',
                }}
                defaultValue={TabsOptions.valueFirst}
                buttonStyle='solid'
            >
                <Radio.Button
                    value={TabsOptions.valueFirst}
                    style={{
                        padding: '0px 9.5px',
                        border: 'none',
                        borderRadius: '2px',
                    }}
                >
                    {tabTitleFirst}
                </Radio.Button>
                <Radio.Button
                    value={TabsOptions.valueSecond}
                    style={{
                        padding: '0px 9.5px',
                        border: 'none',
                        borderRadius: '2px',
                    }}
                >
                    {tabTitleSecond}
                </Radio.Button>
            </Radio.Group>
        </div>
    );
};
