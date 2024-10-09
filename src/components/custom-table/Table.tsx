import { Button, Flex, Image } from 'antd';
import styles from './Table.module.css';
import { TableRow } from './TableRow/TableRow';
import srcDownload from '../../assets/icons/download.svg';
import srcImport from '../../assets/icons/import.svg';
import { useState } from 'react';

type Props = {
	typeTable: 'detail1D' | 'workpiece' | 'detail2D' | 'sizes2D';
};

export const Table = ({ typeTable }: Props) => {
	const [rows, setRows] = useState([{ number: 1, detail: 'dasdasdasdsad' }]);
	const handlerAdd = () => {
		setRows((last) => [
			...last,
			{ number: last.length + 1, detail: 'dasdasdasdsad' },
		]);
	};
	return (
		<Flex vertical className={styles.table}>
			<Flex className={styles['table__title']}>
				{typeTable === 'detail1D'
					? 'Деталь'
					: typeTable === 'workpiece'
					? 'Заготовка'
					: ''}
			</Flex>
			<TableRow typeTable={typeTable} isHeader />
			{rows.map((row, i) => (
				<TableRow typeTable={typeTable} rowInfo={row} key={i} />
			))}
			<Flex
				className={`${styles['table__buttons']} ${
					styles[`table__buttons_${typeTable}`]
				}`}
			>
				{typeTable !== 'workpiece' && (
					<>
						<Button className={styles['btn-download']}>
							<Image preview={false} src={srcDownload} />
						</Button>
						<Button className={styles['btn-import']}>
							<Image preview={false} src={srcImport} />
							Импорт
						</Button>
					</>
				)}
				<Button
					className={styles['btn-add']}
					type="primary"
					onClick={() => handlerAdd()}
				>
					Добавить
				</Button>
			</Flex>
		</Flex>
	);
};
