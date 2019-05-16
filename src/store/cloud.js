import connect from "@vkontakte/vkui-connect-promise";

const cloud = {
    state: {},
    reducers: {
        update(state, payload) {
            return {...state, ...payload};
        }
    },
    effects: (dispatch) => ({
        async initialize(app_id) {
            const access_token = await connect.send("VKWebAppGetAuthToken", {
                app_id,
                scope: "user"
            }).then((result) => result.data.access_token);
            dispatch.cloud.update({ access_token });

            await connect.send("VKWebAppCallAPIMethod", {
                "method": "execute.getParamsList",
                "params": {
                    "v": "5.95",
                    "access_token": access_token
                }
            }).then((result) => dispatch.cloud.loadByKeys(result.data.response));
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
                    dispatch.cloud.update(dispatch.cloud.update(result.data.response.reduce((a, x) => {a[x.key] = x.value; return a}, [])));
                })
                .catch((err) => {
                    dispatch.cloud.update({
                        pidor: err.data.error_type
                    })
                })
        }
    })
};

export default cloud;