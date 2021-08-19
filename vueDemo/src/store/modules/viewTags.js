export default {
	state: {
		viewTags: []
	},
	mutations: {
		pushViewTags(state, route){
			console.log(route);
			var target = null;
			
			for(var i=0;i<state.viewTags.length;i++){
				var item = state.viewTags[i];
				
				if(item.path.indexOf('-')!=-1){
					if(route.path.indexOf('-')!=-1){
						target = (item.path.substr(0,item.path.indexOf('-')) === route.path.substr(0,route.path.indexOf('-')));
					}else{
						target = (item.path.substr(0,item.path.indexOf('-')) === route.path);
					}
				}else{
					if(route.path.indexOf('-')!=-1){
						target = (item.path === route.path.substr(0,route.path.indexOf('-')));
					}else{
						target = (item.path === route.path);
					}
				}
				if(target) break;
			}
			
			
			let isName = route.name;
			if(!target && isName){
				state.viewTags.push(route)
			}
			
			if(target){
				var repeatIndex = null;
				state.viewTags.find(function(item,index){
					if(item.path.indexOf('-')!=-1){
						
						if(route.path.indexOf('-')!=-1){
							if(item.path.substr(0,item.path.indexOf('-')) == route.path.substr(0,route.path.indexOf('-'))){ 
								repeatIndex = index;
							}
						}else{
							if(item.path.substr(0,item.path.indexOf('-')) == route.path){ 
								repeatIndex = index;
							}
						}
					}else{
						
						if(route.path.indexOf('-')!=-1){
							if(item.path == route.path.substr(0,route.path.indexOf('-'))){ 
								repeatIndex = index;
							}
						}else{
							if(item.path == route.path){ 
								repeatIndex = index;
							}
						}
					}
					
				});
				if(repeatIndex || repeatIndex===0){
					state.viewTags[repeatIndex] = route;
				}else{
					state.viewTags.push(route)
				}
			}
			
		},
		removeViewTags(state, route){
			state.viewTags.forEach((item, index) => {
				if (item.path === route.path){
					state.viewTags.splice(index, 1)
				}
			})
		},
		updateViewTags(state, route){
			state.viewTags.forEach((item) => {
				if (item.path == route.path){
					item = Object.assign(item, route)
				}
			})
		},
		clearViewTags(state){
			state.viewTags = []
		}
	}
}
