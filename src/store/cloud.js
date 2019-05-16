import connect from "@vkontakte/vkui-connect-promise";
import old_connect from "@vkontakte/vkui-connect";

const cloud = {
    state: {},
    reducers: {
        update(state, payload) {
            return {...state, ...payload};
        }
    },
    effects: (dispatch) => ({
        async initialize(app_id) {
            old_connect.subscribe((action) => {
                if (action.detail.type === "VKWebAppAccessTokenReceived") {
                    dispatch.cloud.update({ access_token: action.detail.data.access_token });
                    connect.send("VKWebAppCallAPIMethod", {
                        "method": "execute.getParamsList",
                        "params": {
                            "v": "5.95",
                            "access_token": action.detail.data.access_token
                        }
                    }).then((result) => dispatch.cloud.loadByKeys(result.data.response));
                }
            });
            old_connect.send("VKWebAppInit", {});
            old_connect.send("VKWebAppGetAuthToken", {
                app_id: app_id,
                scope: "user"
            });
        },
        async changeParam(payload, state) {
            const { param, value } = payload;
            connect.send("VKWebAppCallAPIMethod", {
                "method": "execute.setParam",
                "params": {
                    "param": param,
                    "value": value,
                    "v": "5.95",
                    "access_token": state.cloud.access_token
                }
            }).then((result) => dispatch.cloud.loadByKeys(result.data.response));
        },
        async loadByKeys(keys, state) {
            connect.send("VKWebAppCallAPIMethod", {
                "method": "execute.getParams",
                "params": {
                    "keys": keys.join(","),
                    "v": "5.95",
                    "access_token": state.cloud.access_token
                }
            })
                .then((result) => {
                    dispatch.cloud.update(dispatch.cloud.update(
                        result.data.response.reduce((a, x) => {a[x.key] = x.value; return a}, { "loaded": true })
                    ));
                })
                .catch(() => dispatch.cloud.update({ "loaded": true }))
        }
    })
};

export default cloud;