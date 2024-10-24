import { Flex, Image } from 'antd';
import srcError from '../../../assets/icons/error.svg';
import srcClose from '../../../assets/icons/close.svg';
import styles from './CsvError.module.css';

type Props = {
	error: string;
	setError: React.Dispatch<React.SetStateAction<string>>;
};

export const CsvError = ({ error, setError }: Props) => {
	return (
		<Flex vertical className={styles.error} gap="8px">
			<Flex
				align="center"
				justify="space-between"
				className={styles['error__header']}
			>
				<Flex gap="10px" align="center">
					<Image src={srcError} preview={false} />
					Ошибка
				</Flex>
				<Image
					src={srcClose}
					preview={false}
					className={styles['error__close']}
					width="13px"
					height="13px"
					onClick={() => setError('')}
				/>
			</Flex>
			<Flex className={styles['error__text']}>
				{error === 'type'
					? 'Неверный формат файла'
					: error === 'colomns'
					? 'Некорретный файл CSV'
					: ''}
			</Flex>
		</Flex>
	);
};
