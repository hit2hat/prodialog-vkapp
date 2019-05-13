import { init } from "@rematch/core";

import navigator from "./navigator";
import user from "./user";
import transactions from "./transactions";

const models = {
    navigator,
    user,
    transactions
};

const store = init({
    models
});

export default store;