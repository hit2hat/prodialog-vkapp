import * as api from "../api";

const top = {
    state: [],
    reducers: {
        loaded(state, payload) {
            return payload;
        }
    },
    effects: (dispatch) => ({
        async load() {
            const result = await api.getTop();
            dispatch.top.loaded(result);
        }
    })
};

export default top;