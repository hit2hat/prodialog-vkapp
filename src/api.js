const api_endpoint = "https://terminal.viren.ru/api.php?action=";

export const getTop = () => {
    return fetch(api_endpoint + "getTop")
        .then((result) => result.json());
};

export const getTransactions = (id) => {
    return fetch(api_endpoint + "getTransactions&user=" + id)
        .then((result) => result.json())
        .then((result) => result.reverse());
};

export const getProfile = (id) => {
    return fetch(api_endpoint + "getProfile&user=" + id)
        .then((result) => result.json());
};

export const getTransactionById = (id) => {
    return fetch(api_endpoint + "getTransaction&id=" + id)
        .then((result) => result.json())
};