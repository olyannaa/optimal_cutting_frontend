import { Button, Flex, Modal } from 'antd';
import styles from './ModalDeleteDetail.module.css';
import { TreeSelect } from '../../TreeSelect/TreeSelect';
import { useAppSelector } from '../../../app/hooks';
import { clearDetailsDelete, selectDeleteDetails } from '../../../features/deleteDetails';
import { useDeleteDetailMutation } from '../../../app/services/addDxf';
import { useDispatch } from 'react-redux';

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalDeleteDetail = ({ isOpen, setIsOpen }: Props) => {
    const propsModal = {
        open: isOpen,
        maskClosable: false,
        centered: true,
        width: 720,
        destroyOnClose: true,
    };
    const checkedDetailsId = useAppSelector(selectDeleteDetails);
    const [deleteDetails, { isLoading }] = useDeleteDetailMutation();
    const dispatch = useDispatch();

    const handlerDelete = async () => {
        try {
            const response = await deleteDetails(checkedDetailsId).unwrap();
            if (response.message == 'Детали удалены') handlerCancel();
        } catch (err) {
            console.log(err);
        }
    };

    const handlerCancel = () => {
        setIsOpen(false);
        dispatch(clearDetailsDelete());
    };

    return (
        <Modal
            footer={[
                <Button
                    onClick={handlerDelete}
                    type='primary'
                    danger
                    key={1}
                    className={styles['btn-bottom']}
                    loading={isLoading}
                >
                    Удалить выбранные детали
                </Button>,
            ]}
            onCancel={handlerCancel}
            {...propsModal}
        >
            <Flex vertical className={styles.modal}>
                <Flex className={styles.modal__title}>Детали</Flex>
                <Flex className={styles.modal__subtitle}>Выберите детали</Flex>
                <TreeSelect type='delete' />
            </Flex>
        </Modal>
    );
};
