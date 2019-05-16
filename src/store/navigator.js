import connect from "@vkontakte/vkui-connect-promise";

const homeView = "home";

const navigator = {
    state: {
        active: homeView,
        history: [homeView],
        popout: null
    },
    reducers: {
        go(state, payload) {
            return {active: payload, history: [...state.history, payload], popout: null};
        },
        back(state) {
            return {active: state.history[state.history.length - 2], history: state.history.slice(0, state.history.length - 1), popout: null};
        },
        setPopout(state, payload) {
            return {...state, popout: payload};
        }
    },
    effects: (dispatch) => ({
        goForward(panel, state) {
            if(state.navigator.active === homeView) {
                connect.send("VKWebAppEnableSwipeBack", {});
            }
            dispatch.navigator.go(panel);
        },
        goBack(payload, state) {
            if(state.navigator.history[state.navigator.history.length - 2] === homeView) {
                connect.send("VKWebAppDisableSwipeBack", {});
            }
            dispatch.navigator.back();
        }
    })
};

export default navigator;