import React from 'react';
import { connect } from "react-redux";
import { View, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from "./containers/Home";
import Profile from "./containers/Profile";

const App = ({ activePanel, history, goForward, goBack }) => {
	return (
		<ConfigProvider isWebView={true}>
			<View
				activePanel={activePanel}
				history={history}
				onSwipeBack={goBack}
			>
				<Home id="home" go={goForward} />
				<Profile id="profile" back={goBack} />
			</View>
		</ConfigProvider>
	);
};

const mapProps = (state) => ({
	activePanel: state.navigator.active,
	history: state.navigator.history
});

const mapDispatch = ({ navigator: { goForward, goBack } }) => ({
	goForward,
	goBack
});

export default connect(mapProps, mapDispatch)(App);
