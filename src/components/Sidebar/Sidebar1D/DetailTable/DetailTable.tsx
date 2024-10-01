import { Button, Col, Flex, Image, Row, Typography } from 'antd';
import styles from './DetailTable.module.css';
import { TableInput } from '../../../custom-input/TableInput/TableInput';
import srcDownload from '../../../../assets/icons/download.svg'
import srcImport from '../../../../assets/icons/import.svg'

export const DetailTable = () => {
	return (
		<Flex vertical>
			<Typography.Text className={styles.title}>Деталь</Typography.Text>
			<>
				<Row className={styles.headerTableDetailRow}>
					<Col span={5} className={styles.headerTableDetailCell}>
						№
					</Col>
					<Col span={12} className={styles.headerTableDetailCell}>
						<Flex
							className={styles.headerTableDetailCellLength}
							align="center"
						>
							Длина
						</Flex>
					</Col>
					<Col span={7} className={styles.headerTableDetailCell}>
						К-во
					</Col>
				</Row>
				<Row className={styles.tableDetailRow}>
					<Col span={5} className={styles.tableDetailCell}>
						1
					</Col>
					<Col span={12} className={styles.tableDetailCell}>
						<Flex
							className={styles.tableDetailCellLength}
							align="center"
						>
							<TableInput name="length" />
						</Flex>
					</Col>
					<Col span={7} className={styles.tableDetailCell}>
						<TableInput name='number' type='number'/>
					</Col>
				</Row>
				<Row className={styles.tableDetailRow}>
					<Col span={5} className={styles.tableDetailCell}>
						1
					</Col>
					<Col span={12} className={styles.tableDetailCell}>
						<Flex
							className={styles.tableDetailCellLength}
							align="center"
						>
							<TableInput name="length" />
						</Flex>
					</Col>
					<Col span={7} className={styles.tableDetailCell}>
						<TableInput name='number' type='number'/>
					</Col>
				</Row>
			</>
			<Flex className={styles.buttons}>
				<Button className={styles.buttonDownload}> 
					<Image preview={false} src={srcDownload} />
				</Button>
				<Button className={styles.buttonImport}> 
					<Image preview={false} src={srcImport} />
					Импорт
				</Button>
				<Button className={styles.buttonAdd} type='primary'> 
					Добавить
				</Button>
			</Flex>
		</Flex>
	);
};
