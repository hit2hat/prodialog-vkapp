import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect-promise';
import App from './App';

import { Provider } from "react-redux";
import store from "./store";

import '@vkontakte/vkui/dist/vkui.css';

// Init VK App
connect.send('VKWebAppInit', {});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
