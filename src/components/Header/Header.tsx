import { Flex, Image } from 'antd';
import styles from './Header.module.css';
import srcPlanet from '../../assets/icons/planet.svg';
import { NavLink } from 'react-router-dom';

export const Header = () => {
	return (
		<Flex className={styles.wrapperHeader}>
			<Flex className={styles.headerNav}>
				<NavLink
					to="/cutting2D"
					className={({ isActive }) =>
						isActive
							? `${styles.active} ${styles.linkNav}`
							: `${styles.linkNav}`
					}
				>
					2D раскрой
				</NavLink>
				<NavLink
					to="/cutting1D"
					className={({ isActive }) =>
						isActive
							? `${styles.active} ${styles.linkNav}`
							: `${styles.linkNav}`
					}
				>
					1D раскрой
				</NavLink>
				<NavLink
					to="/addDetail"
					className={({ isActive }) =>
						isActive
							? `${styles.active} ${styles.linkNav}`
							: `${styles.linkNav}`
					}
				>
					Добавить деталь
				</NavLink>
			</Flex>
			<Flex className={styles.icon}>
				<Image preview={false} src={srcPlanet} />
			</Flex>
		</Flex>
	);
};
