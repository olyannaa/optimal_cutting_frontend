import { Flex, Image } from 'antd';
import { Login } from '../../components/Login/Login';
import srcPlanet from '../../assets/icons/planet.svg';
import styles from './Authorization.module.css';

export const Authorization = () => {
	return (
		<Flex
			style={{
				height: '100vh',
				background: 'var(--background-auth)',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Flex className={styles.icon}>
				<Image preview={false} src={srcPlanet} />
			</Flex>
			<Login />
			<Flex className={styles.rights}>
				Права защищены ©2024 Разработка Info@vegavent.ru
			</Flex>
		</Flex>
	);
};
