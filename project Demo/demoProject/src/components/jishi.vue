<template>
    <div class="wrapper">
		<timeDate :timeState = Method></timeDate>
        <button id="stop" name="button" @click="stop">stop</button>
        <button id="start" name="button" @click="start">start</button>
        <!-- <button id="reset" name="button" @click="reset">reset</button> -->
    </div>
</template>
<script>
import timeDate from '../views/jishiqi.vue'
export default {
    data() {
        return {
			Method: ''
        };
	},
	components: {timeDate},
    methods: {
		start() {
			this.Method = 'start'
		},
		stop() {
			this.Method = 'stop'
		},
		// reset() {
		// 	this.Method = 'reset'
		// }
	},
    created: function() {}
};
</script>
<style scoped>
#mytime {
    background: #bbb;
    color: #fff;
    display: block;
}
.wrapper {
    text-align: center;
    width: 60%;
    margin: 250px auto;
}
</style>
