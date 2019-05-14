import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { View, ConfigProvider } from '@vkontakte/vkui';

import Home from "./containers/Home";
import Profile from "./containers/Profile";
import Transaction from "./containers/Transaction";

const getObjectUrlString = (string) => {
	let search = string;
	return search === "" ? null : search.split("&").reduce((prev, curr) => {
		const [key, value] = curr.split("=");
		prev[decodeURIComponent(key)] = decodeURIComponent(value);
		return prev;
	}, {});
};

const App = ({ activePanel, history, goForward, goBack, userLoad, selectSingleTransaction }) => {
	useEffect(() => {
		userLoad();
		const params = getObjectUrlString(window.location.hash.replace("#", ""));
		if(params && params["transactionId"]) {
			selectSingleTransaction(params["transactionId"]);
			goForward("transaction");
		}
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
			</View>
		</ConfigProvider>
	);
};

const mapProps = (state) => ({
	activePanel: state.navigator.active,
	history: state.navigator.history
});

const mapDispatch = ({ navigator: { goForward, goBack }, user, transactions: { selectSingleTransaction } }) => ({
	goForward,
	goBack,
	userLoad: user.load,
	selectSingleTransaction
});

export default connect(mapProps, mapDispatch)(App);
