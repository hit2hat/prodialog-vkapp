const api_endpoint = "http://terminal.viren.ru/api.php?action=";

export const getTop = () => {
    fetch(api_endpoint + "getTop")
        .then((result) => result.json())
        .then((result) => {
            console.log(result);
        })
        .catch()
};

export const getTransactions = (id) => {
    fetch(api_endpoint + "getTransactions&user=" + id)
        .then((result) => result.json())
        .then((result) => {
            console.log(result.reverse());
        })
        .catch()
};

export const getProfile = (id) => {
    fetch(api_endpoint + "getProfile&user=" + id)
        .then((result) => result.json())
        .then((result) => {
            console.log(result);
        })
        .catch()
};