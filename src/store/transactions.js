import * as api from '../api';

const transactions = {
    state: {
        list: [],
        selected: 0
    },
    reducers: {
        loaded(state, payload) {
            return { list: payload, selected: 0 };
        },
        select(state, payload) {
            return {...state, selected: payload};
        }
    },
    effects: (dispatch) => ({
        async load(id){
            const result = await api.getTransactions(id);
            dispatch.transactions.loaded(result);
        }
    })
};

export default transactions;