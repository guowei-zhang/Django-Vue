export default {
	state: {
		//菜单是否折叠 toggle
		menuIsCollapse: false,
	},
	mutations: {
		SET_ismobile(state, key){
			state.ismobile = key
		},
		SET_layout(state, key){
			state.layout = key
		},
		SET_theme(state, key){
			state.theme = key
		},
		TOGGLE_menuIsCollapse(state){
			state.menuIsCollapse = !state.menuIsCollapse
		},
		TOGGLE_layoutTags(state){
			state.layoutTags = !state.layoutTags
		}
	}
}
