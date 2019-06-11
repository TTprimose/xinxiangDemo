import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import jishi from '@/components/jishi'
import du from '@/components/duka'
import luyin from '@/components/luyin'
import ic from '@/components/ic'
import fine from '@/components/fine'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/he',
			name: 'HelloWorld',
			component: HelloWorld
		},
		{
			path: '/fine',
			name: 'fine',
			component: fine
		},
		{
			path: '/ic',
			name: 'ic',
			component: ic
		},
		{
			path: '/du',
			name: 'duka',
			component: du
		},
		{
			path: '/luyin',
			name: 'luyin',
			component: luyin
		},
		{
			path: '/ji',
			name: 'ji',
			component: jishi
		}
	]
})
