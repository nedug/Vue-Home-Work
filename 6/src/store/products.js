export default {
    namespaced: true,
    state: {
        items: stub(),
    },
    getters: {
        all: state => state.items,
    },
    mutations: {},
    actions: {},
};

function stub() {
    return [
        { 'id': 100, 'title': 'Iphone 14', 'price': 1200, 'rest': 10 },
        { 'id': 101, 'title': 'Samsung AAZ8', 'price': 2200, 'rest': 5 },
        { 'id': 103, 'title': 'Nokia 3310', 'price': 500, 'rest': 2 },
        { 'id': 105, 'title': 'Huawei ZZ', 'price': 1500, 'rest': 8 },
    ];
}