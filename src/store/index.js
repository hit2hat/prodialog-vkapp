import { init } from "@rematch/core";

import navigator from "./navigator";
import user from "./user";
import transactions from "./transactions";
import top from "./top";
import cloud from "./cloud";

const models = {
    navigator,
    user,
    transactions,
    top,
    cloud
};

const store = init({
    models
});

export default store;