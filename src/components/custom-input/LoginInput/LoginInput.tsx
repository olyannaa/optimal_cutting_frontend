import { Form, Image, Input } from 'antd';
import styles from './LoginInput.module.css';
import srcLock from '../../../assets/icons/lock.svg';
import srcPeople from '../../../assets/icons/people.svg';

type Props = {
	name: string;
	placeholder: string;
	type?: string;
};

export const LoginInput = ({ name, placeholder, type = 'text' }: Props) => {
	return (
		<Form.Item
			name={name}
			className={styles.formItem}
			style={{ marginBottom: name === 'login' ? '28px' : '22px' }}
			rules={[
				{
					required: true,
					message: 'Обязательное поле',
				},
			]}
		>
			<Input
				placeholder={placeholder}
				type={type}
				className={styles.loginInput}
				prefix={
					<Image
						preview={false}
						src={name === 'login' ? srcPeople : srcLock}
					/>
				}
			/>
		</Form.Item>
	);
};
