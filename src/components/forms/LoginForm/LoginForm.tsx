import { Button, Form } from 'antd';
import { LoginInput } from '../../custom-input/LoginInput/LoginInput';
import styles from './LoginForm.module.css';
import { LoginData, useLoginMutation } from '../../../app/services/auth';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IError } from '../../../types/Error';

export const LoginForm = () => {
    const [loginUser, { isLoading }] = useLoginMutation();
    const navigate: NavigateFunction = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleAuth = async (data: LoginData) => {
        try {
            setErrorMessage('');
            const formData = new FormData();
            formData.append('Login', data.Login);
            formData.append('Password', data.Password);
            await loginUser(formData).unwrap();
            navigate('/cutting/1D');
        } catch (err) {
            if ((err as IError).originalStatus === 400) {
                setErrorMessage('Неверный логин или пароль');
            } else {
                setErrorMessage(
                    'Сервис временно не доступен. Попробуйте позже'
                );
            }
        }
    };

    return (
        <Form className={styles.loginForm} onFinish={handleAuth}>
            <LoginInput name='Login' placeholder='логин' />
            <LoginInput name='Password' placeholder='пароль' type='password' />
            {errorMessage ? (
                <p style={{ color: 'red', marginBottom: '2vh' }}>
                    {errorMessage}
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
    );
};
