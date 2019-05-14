import React from "react";
import ReactDOM from "react-dom";
import connect from "@vkontakte/vkui-connect-promise";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store";

import "@vkontakte/vkui/dist/vkui.css";

// Init VK App
connect.send("VKWebAppInit", {});

const getObjectUrlString = (string) => {
    let search = string;
    return search === "" ? null : search.split("&").reduce((prev, curr) => {
        const [key, value] = curr.split("=");
        prev[decodeURIComponent(key)] = decodeURIComponent(value);
        return prev;
    }, {});
};

const params = getObjectUrlString(window.location.hash.replace("#", ""));
if(params && params["transactionId"]) {
    store.dispatch.transactions.selectSingleTransaction(params["transactionId"]);
    store.dispatch.navigator.goForward("transaction");
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
