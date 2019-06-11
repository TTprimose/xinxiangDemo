<template>
  <div class="box">
    <object
      id="audit"
      height="0"
      width="0"
      type="application/x-itst-activex"
      clsid="{A885513E-B0A6-4AF5-B20D-AE1F68F8DF00}"
    ></object>
	录音
    <button @click="initRecord">初始化</button>
    <button @click="startRecord">开始</button>
    <button @click="stopRecord">结束</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: ""
    };
  },
  methods: {
    initRecord() {
	  let audit = document.getElementById("audit");
	  audit.setCallback(this.callback)
    },
    startRecord() {
	  let audit = document.getElementById("audit");
	  audit.start('D:\\')
    },
    stopRecord() {
      let audit = document.getElementById("audit");
      audit.stop();
    },
    callback(int) {}
  },
  mounted() {
    // this.appendRecorder();
    // var idCard = document.getElementById("idCard");
    // console.log(idCard);
    // try {
    //   idCard.init();
    //   this.obj = idCard;
    // } catch (e) {
    //   console.log("初始化失败");
    // }
  },
  created() {}
};
</script>



