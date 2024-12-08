import { Button, Flex, Input, Spin } from 'antd';
import { BranchSelect } from './BranchSelect/BranchSelect';
import { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import styles from './TreeSelect.module.css';
import {
    ResponseGetDesignations,
    useLazyGetDesignationsQuery,
} from '../../app/services/addDxf';

export const TreeSelect = () => {
    const [getDesignationsQuery, { data, isLoading }] = useLazyGetDesignationsQuery();
    const [value, setValue] = useState<string>('');
    const [searchedDetails, setSearchedDetails] =
        useState<ResponseGetDesignations | null>(data ?? null);
    const getDesignations = async () => {
        const res = await getDesignationsQuery().unwrap();
        setSearchedDetails(res);
    };

    useEffect(() => {
        getDesignations();
    }, []);

    const searchDetails = () => {
        if (!value || !data) {
            setSearchedDetails(data ?? null);
            return;
        }
        const filterDetails: ResponseGetDesignations = {};
        Object.keys(data).forEach((key) => {
            const filterArray = data[key].filter((detail) =>
                detail.designation.includes(value)
            );
            if (filterArray.length) {
                filterDetails[key] = filterArray;
            }
        });
        setSearchedDetails(filterDetails);
    };

    return (
        <>
            {isLoading && <Spin />}
            {!isLoading && (
                <Flex vertical gap='18px'>
                    <Flex className={styles.search}>
                        <Input value={value} onChange={(e) => setValue(e.target.value)} />
                        <Button
                            onClick={searchDetails}
                            icon={<SearchOutlined />}
                            className={styles.search__button}
                            type='primary'
                            style={{ width: '56px' }}
                        />
                    </Flex>
                    <Flex vertical className={styles.tree}>
                        {searchedDetails &&
                        Object.values(searchedDetails).some((arr) => arr.length) &&
                        data ? (
                            Object.keys(data).map((key, id) => {
                                if (searchedDetails && searchedDetails[key])
                                    return (
                                        <BranchSelect
                                            name={key}
                                            key={id}
                                            details={searchedDetails[key]}
                                        />
                                    );
                            })
                        ) : (
                            <Flex>Не найдено</Flex>
                        )}
                    </Flex>
                </Flex>
            )}
        </>
    );
};
