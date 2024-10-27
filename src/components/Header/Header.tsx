import { Flex } from 'antd';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { linksNavHeader } from '../const/linksNavHeader';

export const Header = () => {
	return (
		<Flex className={styles.header}>
			<Flex className={styles['header-nav']}>
				{linksNavHeader.map((el, i) => (
					<NavLink
						to={el.link}
						key={i}
						className={({ isActive }) =>
							isActive
								? `${styles['header-nav__link_active']} ${styles['header-nav__link']}`
								: `${styles['header-nav__link']}`
						}
					>
						{el.name}
					</NavLink>
				))}
			</Flex>
		</Flex>
	);
};
