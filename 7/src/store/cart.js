const BASEURL = 'http://faceprog.ru/reactcourseapi/cart/';

export default {
    namespaced: true,
    state: {
        items: [],
        token: null,
    },
    getters: {
        inCart: state => id => state.items.some(item => item.id == id),
        itemsDetailed: (state, getters, rootState, rootGetters) => {
            return state.items.map(item => {
                let product = rootGetters['products/one'](item.id);
                return { ...product, cnt: item.cnt };
            });
        },
        length: state => state.items.length,
        total: (state, getters) => getters.itemsDetailed.reduce((t, i) => t + i.price * i.cnt, 0),
    },
    mutations: {
        load(state, { cart, token }) {
            state.items = cart;
            state.token = token;
        },
        add(state, id) {
            state.items.push({ id, cnt: 1 });
        },
        remove(state, id) {
            state.items = state.items.filter(item => item.id != id);
        },
        clean(state) {
            state.items = [];
        },
        setCnt(state, { id, cnt }) {
            let item = state.items.find(item => item.id == id);
            item.cnt = cnt;
        },
    },
    actions: {
        async load({ commit }) {
            let oldToken = localStorage.getItem('CART__TOKEN');
            let response = await fetch(`${BASEURL}load.php?token=${oldToken}`);
            let { cart, token, needUpdate } = await response.json();

            if (needUpdate) {
                localStorage.setItem('CART__TOKEN', token);
            }

            commit('load', { cart, token });
        },
        async add({ commit, getters, state }, id) {
            if (!getters.inCart(id)) {
                let response = await fetch(`${BASEURL}add.php?token=${state.token}&id=${id}`);
                let res = await response.json();

                if (res) {
                    commit('add', id);
                }
            }
        },
        async remove({ commit, getters, state }, id) {
            if (getters.inCart(id)) {
                let response = await fetch(`${BASEURL}remove.php?token=${state.token}&id=${id}`);
                let res = await response.json();

                if (res) {
                    commit('remove', id);
                }
            }
        },
        async clean({ commit, getters, state }) {
            if (getters.length) {
                let response = await fetch(`${BASEURL}clean.php?token=${state.token}`);
                let res = await response.json();

                if (res) {
                    commit('clean');
                }
            }
        },
        async setCnt({ commit, getters, state }, { id, cnt }) {
            if (getters.inCart(id)) {

                let response = await fetch(`${BASEURL}change.php?token=${state.token}&id=${id}&cnt=${cnt}`);
                let res = await response.json();

                if (res) {
                    let item = getters.itemsDetailed.find(item => item.id == id);
                    let validCnt = Math.min(Math.max(cnt, 1), item.rest);
                    commit('setCnt', { id, cnt: validCnt });
                }
            }
        },
    },
};
