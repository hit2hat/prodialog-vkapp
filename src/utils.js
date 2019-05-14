export const getObjectUrlString = (string) => {
    let search = string;
    return search === "" ? null : search.split("&").reduce((prev, curr) => {
        const [key, value] = curr.split("=");
        prev[decodeURIComponent(key)] = decodeURIComponent(value);
        return prev;
    }, {});
};

export const fireEvent = (link) => {
    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';

    a.dispatchEvent(new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    }));
};