import { Flex, Typography } from 'antd';
import styles from './Login.module.css';
import { LoginForm } from '../forms/LoginForm/LoginForm';

export const Login = () => {
	return (
		<Flex className={styles.login} vertical align="center">
			<h1>Оптимальный раскрой</h1>
			<h2>
				Программа для оптимального раскроя материала для лазерной резки
			</h2>
			<Flex vertical className={styles.formWrapper}>
				<Flex className={styles.formTitleWrapper}>
					<Typography.Text className={styles.formTitle}>
						Вход
					</Typography.Text>
				</Flex>
				<LoginForm />
			</Flex>
		</Flex>
	);
};
