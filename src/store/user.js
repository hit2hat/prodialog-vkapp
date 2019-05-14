import connect from "@vkontakte/vkui-connect-promise";
import * as api from "../api";

const user = {
    state: {},
    reducers: {
        loaded(state, payload) {
            return payload;
        },
        update(state, payload) {
            return {...state, ...payload};
        }
    },
    effects: (dispatch) => ({
        async load() {
            const result = await connect.send("VKWebAppGetUserInfo", {});
            dispatch.user.loaded(result.data);
            dispatch.user.loadProfile(result.data.id);
            dispatch.transactions.load(result.data.id);
            dispatch.top.load();
        },
        async loadProfile(id) {
            const result = await api.getProfile(id);
            dispatch.user.update(result);
        }
    })
};

export default user;