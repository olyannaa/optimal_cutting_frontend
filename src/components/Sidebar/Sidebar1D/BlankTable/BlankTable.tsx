import { Button, Col, Flex, Row, Typography } from 'antd';
import styles from './BlankTable.module.css';
import { TableInput } from '../../../custom-input/TableInput/TableInput';

export const BlankTable = () => {
	return (
		<Flex vertical className={styles['blank-table']}>
			<Typography.Text className={styles['blank-table__title']}>
				Заготовка
			</Typography.Text>
			<>
				<Row
					className={`${styles['blank-table__row']} ${styles['blank-table__row_header']}`}
				>
					<Col
						span={7}
						className={`${styles['blank-table__cell']} ${styles['blank-table__cell_header']}`}
					>
						№
					</Col>
					<Col
						span={17}
						className={`${styles['blank-table__cell']} ${styles['blank-table__cell_header']}`}
					>
						<Flex className={styles['cell-body']} align="center" justify='center'>
							Длина
						</Flex>
					</Col>
				</Row>
				<Row className={styles['blank-table__row']}>
					<Col span={7} className={styles['blank-table__cell']}>
						1
					</Col>
					<Col span={17} className={styles['blank-table__cell']}>
						<TableInput name="length" />
					</Col>
				</Row>
				<Row className={styles['blank-table__row']}>
					<Col span={7} className={styles['blank-table__cell']}>
						1
					</Col>
					<Col span={17} className={styles['blank-table__cell']}>
						<TableInput name="length" />
					</Col>
				</Row>
			</>
			<Flex className={styles['blank-table__buttons']}>
				<Button className={styles['button-add']} type="primary">
					Добавить
				</Button>
			</Flex>
		</Flex>
	);
};
