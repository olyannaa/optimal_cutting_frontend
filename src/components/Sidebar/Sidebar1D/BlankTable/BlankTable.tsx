import { Button, Col, Flex, Row, Typography } from 'antd';
import styles from './BlankTable.module.css'
import { TableInput } from '../../../custom-input/TableInput/TableInput';

export const BlankTable=()=>{
	return(
		<Flex vertical>
			<Typography.Text className={styles.title}>Заготовка</Typography.Text>
			<>
				<Row className={styles.headerTableBlankRow}>
					<Col span={7} className={styles.headerTableBlankCell}>
						№
					</Col>
					<Col span={17} className={styles.headerTableBlankCell}>
						<Flex
							className={styles.headerTableBlankCellLength}
							align="center"
						>
							Длина
						</Flex>
					</Col>
				</Row>
				<Row className={styles.tableBlankRow}>
					<Col span={7} className={styles.tableBlankCell}>
						1
					</Col>
					<Col span={17} className={styles.tableBlankCell}>
						<Flex
							className={styles.tableBlankCellLength}
							align="center"
						>
							<TableInput name="length" />
						</Flex>
					</Col>
				</Row>
				<Row className={styles.tableBlankRow}>
					<Col span={7} className={styles.tableBlankCell}>
						1
					</Col>
					<Col span={17} className={styles.tableBlankCell}>
						<Flex
							className={styles.tableBlankCellLength}
							align="center"
						>
							<TableInput name="length" />
						</Flex>
					</Col>
				</Row>
			</>
			<Flex className={styles.buttons}>
				<Button className={styles.buttonAdd} type='primary'> 
					Добавить
				</Button>
			</Flex>
		</Flex>
	)
}