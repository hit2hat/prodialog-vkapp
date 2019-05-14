import React from "react";
import ReactDOM from "react-dom";
import connect from "@vkontakte/vkui-connect-promise";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store";

import "@vkontakte/vkui/dist/vkui.css";

import { getObjectUrlString } from "./utils";

// Init VK App
connect.send("VKWebAppInit", {});



const params = getObjectUrlString(window.location.hash.replace("#", ""));
if(params && params["transactionId"]) {
    store.dispatch.transactions.selectSingleTransaction(params["transactionId"]);
    store.dispatch.navigator.goForward("transaction");
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
