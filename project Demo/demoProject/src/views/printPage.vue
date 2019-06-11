<template>
    <div>
		<el-button type="primary" @click="printPage" :class="this.content">打印</el-button>


	</div>
</template>

<script>

export default {
	props:['content'],

	methods: {
		printPage() {
			var list = document.getElementsByClassName(this.content)
			for (let i = 0 ; i < list.length ; i ++) {
				list[i].classList.add('noprint')
			}
			window.print()
			for (let i = 0 ; i < list.length ; i ++) {
				list[i].classList.remove('noprint')
			}


		}
	},

}
</script>

<style media="print">
	@page{
		size: auto;
		margin: 5mm
	}
	.noprint { display:none;}
</style>
