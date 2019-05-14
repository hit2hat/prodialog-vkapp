import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { View, ConfigProvider } from '@vkontakte/vkui';

import Home from "./containers/Home";
import Profile from "./containers/Profile";
import Transaction from "./containers/Transaction";
import Top from "./containers/Top";

const App = ({ activePanel, history, goBack, userLoad }) => {
	useEffect(() => {
		userLoad();
	}, [userLoad]);
	return (
		<ConfigProvider isWebView={true}>
			<View
				activePanel={activePanel}
				history={history}
				onSwipeBack={goBack}
			>
				<Home id="home"/>
				<Profile id="profile" />
				<Transaction id="transaction"/>
				<Top id="top"/>
			</View>
		</ConfigProvider>
	);
};

const mapProps = (state) => ({
	activePanel: state.navigator.active,
	history: state.navigator.history
});

const mapDispatch = ({ navigator: { goBack }, user }) => ({
	goBack,
	userLoad: user.load
});

export default connect(mapProps, mapDispatch)(App);
