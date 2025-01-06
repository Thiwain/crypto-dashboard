export const getApi = (url: string) => {
    const keyHeader = new Headers();
    keyHeader.append("x-cg-demo-api-key", "CG-Zt1rszFfRQLoYWUcbfYMTonp");

    const requestOptions = {
        method: "GET",
        headers: keyHeader,
    };
    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => { return data })
        .catch(error => console.error('Error:', error));
}