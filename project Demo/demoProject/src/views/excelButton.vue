<template>
    <div>
		<el-button type="primary" @click='outEecel' size='small'>导出</el-button>
	</div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
	props:['excelObj'],

	methods: {
		outEecel() {
			var wb = XLSX.utils.table_to_book(document.querySelector('#'+ this.excelObj.id))
			var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
			try {
				FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), this.excelObj.name + '.xlsx')
			}
			catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
			return wbout
		}
	},

}
</script>

<style>

</style>
