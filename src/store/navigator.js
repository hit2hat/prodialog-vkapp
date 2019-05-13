import connect from '@vkontakte/vkui-connect-promise';

const homeView = "home";

const navigator = {
    state: {
        active: homeView,
        history: [homeView]
    },
    reducers: {
        go(state, payload) {
            return {active: payload, history: [...state.history, payload]}
        },
        back(state) {
            return {active: state.history[state.history.length - 2], history: history.slice(0, history.length - 1)}
        }
    },
    effects: (dispatch) => ({
        goForward(panel, state) {
            if(state.active === homeView) {
                vkuiConnect.send('VKWebAppEnableSwipeBack', {});
            }
            dispatch.navigator.go(panel);
        },
        goBack(payload, state) {
            if(state.history[state.history.length - 2] === homeView) {
                connect.send('VKWebAppDisableSwipeBack', {});
            }
            dispatch.navigator.back();
        }
    })
};

export default navigator;