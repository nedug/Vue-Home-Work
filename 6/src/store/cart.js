export default {
    namespaced: true,
    state: {
        items: [],
    },
    getters: {
        inCart: state => id => state.items.some(item => item.id === id),
        cart: state => state.items,
        length: state => state.items.length,
        // total: (state, getter, rootState, rootGetters) rootGetters
        total: (state, getter, rootState, rootGetters) =>
            state.items.reduce((sum, it) => sum + rootGetters['products/product'](it.id).price, 0)
    },
    mutations: {
        add(state, id) {
            state.items.push({ id, cnt: 1 });
        },
        remove(state, id) {
            state.items = state.items.filter(item => item.id !== id);
        },
        setCnt(state, payload) {
            // console.log(payload);
            // console.log(val);
            // state.cnt = { value: Math.max(1, val) };
            // console.log(state.items.map(it => it.id === payload.id ? {...it, cnt: it.cnt + payload.val} : it));
            state.items = state.items.map(it => it.id === payload.id ? {...it, cnt: it.cnt + payload.val} : it)
        },
    },
    actions: {
        add({ commit, getters }, id) {
            if (!getters.inCart(id)) {
                commit('add', id);
            }
        },
        remove({ commit, getters }, id) {
            if (getters.inCart(id)) {
                commit('remove', id);
            }
        },

        increase({ commit, getters, state }, id) {
            // commit('setCnt', state.items.find(item => item.id === id).cnt + 1);
            commit('setCnt', { id, val: 1 });
        },

        decrease({ commit, getters, state }, id) {
            // commit('setCnt', state.items.find(item => item.id === id).cnt + 1);
            commit('setCnt', { id, val: -1 });
        },
    },
};


/*
	inCart(state){
		return function(id){
			return state.items.some(item => item.id == id);
		}
	}
	inCart: state => id => state.items.some(item => item.id == id)
*/