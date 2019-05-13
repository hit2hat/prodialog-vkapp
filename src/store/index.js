import { init } from "@rematch/core";
import navigator from "./navigator";

const models = {
    navigator
};

const store = init({
    models
});

export default store;