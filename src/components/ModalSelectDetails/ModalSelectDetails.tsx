import { Alert, Button, Flex, Modal } from 'antd';
import { TreeSelect } from '../TreeSelect/TreeSelect';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    clearCheckedDetails,
    selectAddedDetails,
    selectCheckedDetails,
    updateAddedDetails,
} from '../../features/selectDetails2DSlice';
import styles from './ModalSelectDetails.module.css';
import { useState } from 'react';
import { Designation } from '../../app/services/addDxf';
import { checkErrorAddDetails } from '../../functions/checkErrorAddDetails';

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalSelectDetails = ({ isOpen, setIsOpen }: Props) => {
    const propsModal = {
        open: isOpen,
        maskClosable: false,
        centered: true,
        width: 720,
        destroyOnClose: true,
    };

    const dispatch = useAppDispatch();
    const checkedDetails = useAppSelector(selectCheckedDetails);
    const addedDetails = useAppSelector(selectAddedDetails);
    const [isError, setIsError] = useState<boolean>(false);

    const handlerAdd = () => {
        let arrDetails: Designation[] = [];
        Object.values(checkedDetails).forEach((arr) => {
            arrDetails = [...arrDetails, ...arr];
        });
        Object.values(addedDetails).forEach((arr) => {
            arrDetails = [...arrDetails, ...arr];
        });
        if (checkErrorAddDetails(arrDetails)) setIsError(true);
        else {
            setIsOpen(false);
            dispatch(updateAddedDetails());
            dispatch(clearCheckedDetails());
        }
    };

    const handlerCancel = () => {
        setIsOpen(false);
        dispatch(clearCheckedDetails());
        setIsError(false);
    };

    return (
        <Modal
            footer={[
                <Button onClick={handlerAdd} type='primary'>
                    Добавить
                </Button>,
            ]}
            onCancel={handlerCancel}
            {...propsModal}
        >
            <Flex vertical className={styles.modal}>
                <Flex className={styles.modal__title}>Детали</Flex>
                <Flex className={styles.modal__subtitle}>Выберите детали</Flex>
                <TreeSelect />
            </Flex>
            {isError && (
                <Alert
                    message='Ошибка'
                    description='Детали из разных материалов'
                    type='error'
                    showIcon
                    closable
                    afterClose={() => setIsError(false)}
                />
            )}
        </Modal>
    );
};
