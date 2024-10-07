import { Button, Col, Divider, Flex, Image, Row, Typography } from 'antd';
import styles from './DetailTable.module.css';
import { TableInput } from '../../../custom-input/TableInput/TableInput';
import srcDownload from '../../../../assets/icons/download.svg';
import srcImport from '../../../../assets/icons/import.svg';

export const DetailTable = () => {
	return (
		<Flex vertical className={styles['detail-table']}>
			<Typography.Text className={styles['detail-table__title']}>
				Деталь
			</Typography.Text>
			<>
				<Row
					className={`${styles['detail-table__row']} ${styles['detail-table__row_header']}`}
				>
					<Col
						span={5}
						className={`${styles['detail-table__cell']} ${styles['detail-table__cell_header']}`}
					>
						№
					</Col>
					<Col
						span={12}
						className={`${styles['detail-table__cell']} ${styles['detail-table__cell_header']}`}
					>
						<Flex
							className={styles['cell-body']}
							align="center"
							justify="center"
						>
							Длина
						</Flex>
					</Col>
					<Col
						span={7}
						className={`${styles['detail-table__cell']} ${styles['detail-table__cell_header']}`}
					>
						К-во
					</Col>
				</Row>
				<Row className={styles['detail-table__row']}>
					<Col span={5} className={styles['detail-table__cell']}>
						1
					</Col>
					<Col span={12} className={styles['detail-table__cell']}>
						<TableInput name="length" />
					</Col>
					<Col span={7} className={styles['detail-table__cell']}>
						<TableInput name="number" type="number" />
					</Col>
				</Row>
				<Row className={styles['detail-table__row']}>
					<Col span={5} className={styles['detail-table__cell']}>
						1
					</Col>
					<Col span={12} className={styles['detail-table__cell']}>
						<TableInput name="length" />
					</Col>
					<Col span={7} className={styles['detail-table__cell']}>
						<TableInput name="number" type="number" />
					</Col>
				</Row>
			</>
			<Flex className={styles['detail-table__buttons']}>
				<Button className={styles['btn-download']}>
					<Image preview={false} src={srcDownload} />
				</Button>
				<Button className={styles['btn-import']}>
					<Image preview={false} src={srcImport} />
					Импорт
				</Button>
				<Button className={styles['btn-add']} type="primary">
					Добавить
				</Button>
			</Flex>
		</Flex>
	);
};
