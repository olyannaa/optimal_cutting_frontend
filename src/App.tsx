import { ConfigProvider, ThemeConfig } from 'antd';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Authorization } from './pages/Auth/Authorization';
import { CustomLayout } from './components/CustomLayout';
import { Cutting1D } from './pages/Cutting1D/Cutting1D';

function App() {
	const theme: ThemeConfig = {
		components: {
			Input: {
				borderRadius: 2,
				activeShadow: 'none',
				fontSize: 16,
				colorText: 'rgba(0, 0, 0, 0.25)',
			},
		},

		token: {},
		cssVar: true,
	};
	return (
        <ConfigProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Authorization />} />

                    <Route element={<CustomLayout />}>
                        <Route
                            path='/cutting1D'
                            element={
                                <Cutting1D/>
                            }
                        />
                        
                    </Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
