import { init } from "@rematch/core";

import navigator from "./navigator";
import user from "./user";
import transactions from "./transactions";
import top from './top';

const models = {
    navigator,
    user,
    transactions,
    top
};

const store = init({
    models
});

export default store;