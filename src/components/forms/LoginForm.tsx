import { Button, Form } from 'antd';
import { LoginInput } from '../custom-input/LoginInput/LoginInput';
import styles from './LoginForm.module.css'
import { LoginData, useLoginMutation } from '../../app/services/auth';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {IError} from '../../types/Error'

export const LoginForm = () => {
	const [loginUser, { isLoading }] = useLoginMutation();
    const navigate: NavigateFunction = useNavigate();
	const [isError, setIsErrors] = useState<boolean>(false);
	
	const handleAuth = async (data: LoginData) => {
		console.log(data);
        try {
            
			const formData = new FormData();
			formData.append('Login', data.Login);
			formData.append('Password', data.Password);
			await loginUser(formData).unwrap();
			console.log(formData);
			navigate('/cabinet');
        } catch (err) {
            if ((err as IError).originalStatus === 401) {
                setIsErrors(true);
            } else {
                console.log(err);
            }
        }
    };
	
	return(
		<Form className={styles.loginForm} onFinish={handleAuth}>
			<LoginInput
			name='Login'
			placeholder='логин'
			/>
			<LoginInput
			name='Password'
			placeholder='пароль'
			/>
			{isError ? (
                    <p style={{ color: 'red', marginBottom: '2vh' }}>
                        Неверный логин или пароль
                    </p>
                ) : null}
			<Button 
				className={styles.btnLogin} 
				htmlType='submit' 
				type='primary'
				loading={isLoading}
				>
				Вход
			</Button>
		</Form>
	)
}