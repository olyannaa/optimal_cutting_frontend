import { Flex, Image } from 'antd';
import srcError from '../../../assets/icons/error.svg';
import srcClose from '../../../assets/icons/close.svg';
import styles from './CsvError.module.css';
import { CsvErrors } from '../../const/CsvErrors';
import { ErrorsCsv } from '../../../types/typeErrorsCsv';

type Props = {
    error: ErrorsCsv;
    setError: React.Dispatch<React.SetStateAction<ErrorsCsv | null>>;
};

export const CsvError = ({ error, setError }: Props) => {
    return (
        <Flex vertical className={styles.error} gap='8px'>
            <Flex
                align='center'
                justify='space-between'
                className={styles['error__header']}
            >
                <Flex gap='10px' align='center'>
                    <Image src={srcError} preview={false} />
                    Ошибка
                </Flex>
                <Image
                    src={srcClose}
                    preview={false}
                    className={styles['error__close']}
                    width='13px'
                    height='13px'
                    onClick={() => setError(null)}
                />
            </Flex>
            <Flex className={styles['error__text']}>{CsvErrors[error]}</Flex>
        </Flex>
    );
};
