import React from "react";
import connect from "@vkontakte/vkui-connect-promise";
import * as api from "../api";
import {ScreenSpinner} from "@vkontakte/vkui";

const user = {
    state: {
        vk: {},
        selected: {}
    },
    reducers: {
        loaded(state, payload) {
            return { ...state, "vk": payload };
        },
        update(state, payload) {
            return {...state, "vk": { ...state.vk, ...payload }};
        },
        select(state, payload) {
            return {...state, "selected": payload };
        }
    },
    effects: (dispatch) => ({
        async load() {
            const result = await connect.send("VKWebAppGetUserInfo", {});
            await dispatch.user.loaded(result.data);
            await dispatch.user.loadProfile(result.data.id);
            await dispatch.transactions.load(result.data.id);
            dispatch.top.load();
        },
        async loadProfile(id, state) {
            const result = await api.getProfile(id);
            dispatch.user.select({ ...result, id });
            if (state.user.vk.id === id) {
                dispatch.user.update({ carma: result.carma });
            }
        },
        async openProfile(id) {
            await dispatch.navigator.setPopout(<ScreenSpinner/>);
            await dispatch.user.loadProfile(id);
            dispatch.navigator.goForward("profile");
        }
    })
};

export default user;