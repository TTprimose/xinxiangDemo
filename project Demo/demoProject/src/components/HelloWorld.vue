<template>
	<div class="box">
		<el-button type="primary" @click="start">录音</el-button>
		<el-button type="primary" @click="stop">停止</el-button>
		<audio :src= srcList controls></audio>
	</div>
</template>

<script>

import { HZRecorder} from '../assets/recorder.js';
var recorder
export default {
    data () {
        return {
			srcList: ''

		}
	},
	methods: {
		start() {
			recorder && recorder.start();
		},
		stop() {
			recorder && recorder.stop();
			var mp3Blob = recorder.upload();
			console.log(mp3Blob)
			this.srcList = URL.createObjectURL(mp3Blob)
			console.log(this.srcList)
		}

	},
	mounted() {
		this.$nextTick(() => {
			// try {
			// 	window.AudioContext = window.AudioContext || window.webkitAudioContext;
			// 	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
			// 	window.URL = window.URL || window.webkitURL;

			// 	audio_context = new AudioContext;
			// 	console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
			// } catch (e) {
			// 	alert('No web audio support in this browser!');
			// }

			navigator.getUserMedia({audio: true}, function (stream) {
				recorder = new HZRecorder(stream)
				console.log('初始化完成');
			}, function(e) {
				console.log('No live audio input: ' + e);
			});
		})
	},


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

