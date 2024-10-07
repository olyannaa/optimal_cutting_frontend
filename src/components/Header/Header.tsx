import { Flex, Image } from 'antd';
import styles from './Header.module.css';
//import srcPlanet from '../../assets/icons/planet.svg';
import { NavLink } from 'react-router-dom';

export const Header = () => {
	return (
		<Flex className={styles.header}>
			<Flex className={styles['header-nav']}>
				<NavLink
					to="/cutting2D"
					className={({ isActive }) =>
						isActive
							? `${styles['header-nav__link_active']} ${styles['header-nav__link']}`
							: `${styles['header-nav__link']}`
					}
				>
					2D раскрой
				</NavLink>
				<NavLink
					to="/cutting1D"
					className={({ isActive }) =>
						isActive
							? `${styles['header-nav__link_active']} ${styles['header-nav__link']}`
							: `${styles['header-nav__link']}`
					}
				>
					1D раскрой
				</NavLink>
				<NavLink
					to="/addDetail"
					className={({ isActive }) =>
						isActive
							? `${styles['header-nav__link_active']} ${styles['header-nav__link']}`
							: `${styles['header-nav__link']}`
					}
				>
					Добавить деталь
				</NavLink>
			</Flex>
			{/* <Flex className={styles['change-language']}>
				<Image preview={false} src={srcPlanet} />
			</Flex> */}
		</Flex>
	);
};
