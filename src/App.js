import React from 'react';
import connect from '@vkontakte/vkui-connect-promise';
import { View, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from "./containers/Home";
import Profile from "./containers/Profile";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: "home",
			history: ["home"],
			fetchedUser: {},
		};
	}

	componentDidMount() {
		connect.send('VKWebAppGetUserInfo', {})
			.then((data) => this.setState({ fetchedUser: data.data }));
	}

	go(activePanel) {
		const history = [...this.state.history];
		history.push(activePanel);
		if (this.state.activePanel === "home") {
			connect.send('VKWebAppEnableSwipeBack', {});
		}
		console.log("go " + this.state.activePanel);
		this.setState({ history, activePanel });
	}

	back = () => {
		const history = [...this.state.history];
		history.pop();
		const activePanel = history[history.length - 1];
		if (activePanel === "home") {
			connect.send('VKWebAppDisableSwipeBack', {});
		}
		console.log("back " + this.state.activePanel);
		this.setState({ history, activePanel });
	};

	render() {
		return (
			<ConfigProvider isWebView={true}>
				<View
					activePanel={this.state.activePanel}
					history={this.state.history}
					onSwipeBack={this.back}
				>
					<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go.bind(this)} />
					<Profile id="profile" back={this.back.bind(this)} />
				</View>
			</ConfigProvider>
		);
	}
}

export default App;
