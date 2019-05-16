import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, ConfigProvider } from "@vkontakte/vkui";

import Home from "./containers/Home";
import Profile from "./containers/Profile";
import Transaction from "./containers/Transaction";
import Top from "./containers/Top";
import About from "./containers/About";

const App = ({ activePanel, history, goBack, userLoad, popout }) => {
	useEffect(() => {
		userLoad();
	}, [userLoad]);
	return (
		<ConfigProvider isWebView={true}>
			<View
				activePanel={activePanel}
				history={history}
				onSwipeBack={goBack}
				popout={popout}
			>
				<Home id="home"/>
				<Top id="top"/>
				<Profile id="profile" />
				<Transaction id="transaction"/>
				<About id="about"/>
			</View>
		</ConfigProvider>
	);
};

const mapProps = (state) => ({
	activePanel: state.navigator.active,
	history: state.navigator.history,
	popout: state.navigator.popout
});

const mapDispatch = ({ navigator: { goBack }, user }) => ({
	goBack,
	userLoad: user.load
});

export default connect(mapProps, mapDispatch)(App);
