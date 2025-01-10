import { Layout } from 'antd';
import { Header } from './Header/Header';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { SelectedMode } from './SelectedMode/SelectedMode';
import { selectIsAuthenticated } from '../features/authSlice';
import { useSelector } from 'react-redux';

export const CustomLayout = () => {
    const location = useLocation();
    const auth = useSelector(selectIsAuthenticated);
    if (!auth) {
        return <Navigate to='/' state={{ from: location }} />;
    }
    return (
        <Layout style={{ height: '100vh' }}>
            <Header />
            <SelectedMode>
                <Outlet />
            </SelectedMode>
        </Layout>
    );
};
