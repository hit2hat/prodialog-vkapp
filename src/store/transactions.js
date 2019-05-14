import * as api from "../api";

const transactions = {
    state: {
        list: [],
        selected: 0
    },
    reducers: {
        loaded(state, payload) {
            return {...state, list: payload };
        },
        select(state, payload) {
            return {...state, selected: payload};
        }
    },
    effects: (dispatch) => ({
        async load(id){
            const result = await api.getTransactions(id);
            dispatch.transactions.loaded(result);
        },
        async selectSingleTransaction(id) {
            const result = await api.getTransactionById(id);
            dispatch.transactions.select(result);
        }
    })
};

export default transactions;