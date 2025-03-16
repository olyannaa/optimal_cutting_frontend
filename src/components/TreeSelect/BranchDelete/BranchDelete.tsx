import { Checkbox, Flex, Image } from 'antd';
import { Designation } from '../../../app/services/addDxf';
import { useState } from 'react';
import srcArrowDown from '../../../assets/icons/arrowDown.svg';
import srcArrowRight from '../../../assets/icons/arrowRight.svg';
import srcFolderOpen from '../../../assets/icons/folderOpen.svg';
import styles from './BranchDelete.module.css';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
    addDetailDelete,
    deleteDetailDelete,
    selectDeleteDetails,
} from '../../../features/deleteDetails';

type Props = {
    name: string;
    details: Designation[];
};

export const BranchDelete = ({ details, name }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const checkedDetailsId = useAppSelector(selectDeleteDetails);
    const dispatch = useAppDispatch();

    const onChangeCheckBox = (event: CheckboxChangeEvent) => {
        const currId = details.find(
            (detail) => detail.id === Number(event.target.value)
        )?.id;
        if (!currId) {
            return;
        }
        if (event.target.checked) {
            dispatch(addDetailDelete(currId));
        } else {
            dispatch(deleteDetailDelete(currId));
        }
    };

    return (
        <>
            <Flex gap='5px'>
                <Image
                    src={isOpen ? srcArrowDown : srcArrowRight}
                    preview={false}
                    onClick={() => setIsOpen((last) => !last)}
                    className={styles.icon_open}
                />
                <Flex>
                    <Image
                        src={srcFolderOpen}
                        preview={false}
                        className={styles['icon_open-dir']}
                    />
                    <Flex align='center'>{name}</Flex>
                </Flex>
            </Flex>
            {isOpen && (
                <Checkbox.Group
                    className={styles['select-details']}
                    value={checkedDetailsId}
                >
                    {details.map((detail) => (
                        <Checkbox
                            value={detail.id}
                            key={detail.id}
                            onChange={(e) => onChangeCheckBox(e)}
                        >
                            {detail.designation}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            )}
        </>
    );
};
