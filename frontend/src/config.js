var api = {
    url: 'http://localhost/api',
    get fetchAll() {
        return `${this.url}/bleep`;
    },
    get fetch() {
        return `${this.url}/bleep`;
    },
    get requestToken() {
        return `${this.url}/usuario/token`;
    },
    get postBleep() {
        return `${this.url}/bleep`
    }
}


export {
    api
}