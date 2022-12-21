import { createStore } from 'vuex';

/*
	const ORDER_STATUSES = {
		new: 0,
		pending: 1,
		done: 2
	}
*/

const store = {
    state: {
        price: 1000,
        cnt: { value: 1 },
        orderStatus: 0,
    },
    getters: {
        price: state => state.price,
        cnt: state => state.cnt.value,
        total: state => state.price * state.cnt.value,
        orderIsNothing: state => state.orderStatus === 0, // wtf my english
        orderIsPending: state => state.orderStatus === 1,
        orderIsDone: state => state.orderStatus === 2,
    },
    mutations: {
        setCnt(state, val) {
            state.cnt = { value: Math.max(1, val) };
        },
        setOrderStatus(state, status) {
            state.orderStatus = status;
        },
    },
    actions: {
        send(store) {
            store.commit('setOrderStatus', 1);

            // request to server
            setTimeout(() => {
                store.commit('setOrderStatus', 2);
            }, 500);
        },
        increase(store) {
            console.log(store);
            store.commit('setCnt', store.state.cnt.value + 1);
        },
        decrease(store) {
            store.commit('setCnt', store.getters.cnt - 1);
        },
        setInput(store, val) {
            store.commit('setCnt', val);
        },
    },
    strict: process.env.NODE_ENV !== 'production',
};

export default createStore(store);


/*
	class VuexParody{
		state = {}
		mutations = {}

		commit(name){
			let fn = this.mutations[name]
			fn(this.state);
		}
	}

*/