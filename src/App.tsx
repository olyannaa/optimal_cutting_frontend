import { ConfigProvider, ThemeConfig } from 'antd';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Authorization } from './pages/Auth/Authorization';

const App = () => {
	const theme: ThemeConfig = {
		components: {
			Input: {
				borderRadius: 2,
				activeShadow: 'none',
				fontSize: 16,
        		colorText:'rgba(0, 0, 0, 0.25)'
			}
		},
		token: {},
		cssVar: true,
	};
	return (
		<ConfigProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Authorization />} />
				</Routes>
			</BrowserRouter>
		</ConfigProvider>
	);
}

export default App;
