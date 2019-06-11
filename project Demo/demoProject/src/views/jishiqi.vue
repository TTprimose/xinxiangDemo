<template>
    <span class="recording__time">{{talkDate.str}}</span>
</template>
<script>
export default {
    data() {
        return {
			talkDate :{
				h: 0, //定义时，分，秒，毫秒并初始化为0；
				m: 0,
				ms: 0,
				s: 0,
				time: 0,
				str: "00:00:00",
				mytime: ""
			}

        };
	},
	props:['timeState'],
    methods: {
        timer() {
            //定义计时函数
            this.talkDate.ms = this.talkDate.ms + 50; //毫秒
            if (this.talkDate.ms >= 1000) {
                this.talkDate.ms = 0;
                this.talkDate.s = this.talkDate.s + 1; //秒
            }
            if (this.talkDate.s >= 60) {
                this.talkDate.s = 0;
                this.talkDate.m = this.talkDate.m + 1; //分钟
            }
            if (this.talkDate.m >= 60) {
                this.talkDate.m = 0;
                this.talkDate.h = this.talkDate.h + 1; //小时
            }
            this.talkDate.str =
                this.toDub(this.talkDate.h) +
                ":" +
                this.toDub(this.talkDate.m) +
                ":" +
                this.toDub(this.talkDate.s) +
                "" /*+this.toDubms(this.ms)+"毫秒"*/;
            // document.getElementById('mytime').innerHTML=h+"时"+m+"分"+s+"秒"+ms+"毫秒";
        },

        reset() {
            //重置
            clearInterval(this.talkDate.time);
            this.talkDate.h = 0;
            this.talkDate.m = 0;
            this.talkDate.ms = 0;
            this.talkDate.s = 0;
            this.talkDate.str = "00:00:00";
        },

        start() {
			//开始
			this.reset()
            this.talkDate.time = setInterval(this.timer, 50);
        },

        stop() {
            //暂停
            clearInterval(this.talkDate.time);
        },

        toDub(n) {
            //补0操作
            if (n < 10) {
                return "0" + n;
            } else {
                return "" + n;
            }
        },
    },
	watch:{
		timeState: {
	　　　　handler(newValue, oldValue) {
				if (newValue == 'start'){
					this.start()
				}
				if (newValue == 'stop'){
					this.stop()
				}
				// if (newValue == 'reset'){
				// 	this.reset()
				// }
	　　　　},
　　	deep: true
　　}

}
};
</script>
<style scoped>
.recording__time {
	font-size: 20px;
}
</style>
