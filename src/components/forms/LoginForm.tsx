import { Button, Form } from 'antd';
import { LoginInput } from '../custom-input/LoginInput/LoginInput';
import styles from './LoginForm.module.css'

export const LoginForm=()=>{
	return(
		<Form className={styles.loginForm} >
			<LoginInput
			name='login'
			placeholder='логин'
			/>
			<LoginInput
			name='password'
			placeholder='пароль'
			type='password'
			/>
			<Button className={styles.btnLogin} htmlType='submit' type='primary'>
				Вход
			</Button>
		</Form>
	)
}