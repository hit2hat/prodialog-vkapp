import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { View, ConfigProvider } from '@vkontakte/vkui';

import Home from "./containers/Home";
import Profile from "./containers/Profile";
import Transaction from "./containers/Transaction";

const App = ({ activePanel, history, goForward, goBack, user, userLoad, transactions, transactionSelect }) => {
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
				<Home id="home" user={user} go={goForward} transactions={transactions.list} transactionSelect={transactionSelect}/>
				<Profile id="profile" back={goBack} />
				<Transaction id="transaction" back={goBack} transaction={transactions.list[transactions.selected]} />
			</View>
		</ConfigProvider>
	);
};

const mapProps = (state) => ({
	activePanel: state.navigator.active,
	history: state.navigator.history,
	user: state.user,
	transactions: state.transactions
});

const mapDispatch = ({ navigator: { goForward, goBack }, user, transactions: { select } }) => ({
	goForward,
	goBack,
	userLoad: user.load,
	transactionSelect: select
});

export default connect(mapProps, mapDispatch)(App);
