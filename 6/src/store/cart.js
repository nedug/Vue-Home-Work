export default {
    namespaced: true,
    state: {
        items: [],
        inProcess: [],
    },
    getters: {
        inCart: state => id => state.items.some(item => item.id === id),
        cart: state => state.items,
        length: state => state.items.reduce((sum, it) => sum + it.cnt, 0),
        // total: (state, getter, rootState, rootGetters) rootGetters
        total: (state, getter, rootState, rootGetters) =>
            state.items.reduce((sum, it) => sum + rootGetters['products/product'](it.id).price * it.cnt, 0),
        disable: state => id => state.inProcess.find(item => item.id === id),
    },

    mutations: {
        add(state, id) {
            state.items.push({ id, cnt: 1 });
        },
        remove(state, id) {
            state.items = state.items.filter(item => item.id !== id);
        },
        setCnt(state, payload) {
            state.items = state.items.map(it => it.id === payload.id
                ? { ...it, cnt: Math.max(1, it.cnt + payload.val) } : it);
        },
        processIn(state, id) {
            state.inProcess.push({ id });
        },
        processOut(state, id) {
            state.inProcess = state.inProcess.filter(item => item.id !== id);
        },
    },
    actions: {
        add({ commit, getters }, id) {
            commit('processIn', id);
            if (!getters.inCart(id)) {
                setTimeout(() => {
                    commit('add', id);
                    commit('processOut', id);
                }, 500);
            }

        },
        remove({ commit, getters }, id) {
            if (getters.inCart(id)) {
                commit('remove', id);
            }
        },
        increase({ commit, getters, state }, id) {
            commit('setCnt', { id, val: 1 });
        },
        decrease({ commit, getters, state }, id) {
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