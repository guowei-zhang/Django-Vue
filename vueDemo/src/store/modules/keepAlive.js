export default {
	state: {
		keepLiveRoute: ['empty'],
		routeKey: null,
		routeShow: true,
		secondRouteShow: true,
		treeRouteShow:true
	},
	mutations: {
		pushKeepLive(state, component){
			if(!state.keepLiveRoute.includes(component)){
				state.keepLiveRoute.push(component)
			}
		},
		removeKeepLive(state, component){
			var index = state.keepLiveRoute.indexOf(component);
			if(index !== -1){
				state.keepLiveRoute.splice(index, 1);
			}
		},
		clearKeepLive(state){
			state.keepLiveRoute = ['empty']
		},
		setRouteKey(state, key){
			state.routeKey = key
		},
		setRouteShow(state, key){
			state.routeShow = key
		},
		setSecondRouteShow(state, key){
			state.secondRouteShow = key
		},
		setTreeRouteShow(state, key){
			state.treeRouteShow = key
		},
	},
	actions: {
		setRouteKey({ commit }, key) {
			commit('setRouteKey', key);
		}
	}
}
