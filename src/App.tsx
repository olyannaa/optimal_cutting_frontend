import { ConfigProvider, ThemeConfig } from 'antd';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Authorization } from './pages/Auth/Authorization';
import { CustomLayout } from './components/CustomLayout';
import { Cutting1D } from './pages/Cutting1D/Cutting1D';
import { Cutting2D } from './pages/Cutting2D/Cutting2D';
import { NewDetail } from './pages/NewDetail/NewDetail';

const App = () => {
	const theme: ThemeConfig = {
		components: {
			Input: {
				borderRadius: 2,
				fontSize: 16,
				colorText: 'rgba(0, 0, 0, 0.85)',
				activeBorderColor: '#40A9FF',
				hoverBorderColor: '#40A9FF',
				controlHeight: 40,
			},
			Select: {
				borderRadius: 2,
				activeBorderColor: '#40A9FF',
				hoverBorderColor: '#40A9FF',
				controlHeight: 40,
			},
			Button: {
				borderRadius: 2,
			},
			InputNumber: {
				borderRadius: 2,
			},
			Radio: {
				buttonBg: 'rgba(0, 0, 0, 0)',
				buttonSolidCheckedActiveBg: '#FFFF',
				buttonSolidCheckedBg: '#FFFF',
				buttonSolidCheckedHoverBg: '#FFFF',
				buttonSolidCheckedColor: '#262626',
				colorText: '#262626',
				buttonColor: '#262626',
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
						<Route path='/cutting/1D' element={<Cutting1D />} />
					</Route>
					<Route element={<CustomLayout />}>
						<Route path='/cutting/2D' element={<Cutting2D />} />
					</Route>
					<Route element={<CustomLayout />}>
						<Route path='/newDetail' element={<NewDetail />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ConfigProvider>
	);
};

export default App;
