<template>
  <div class="box">
    <object
      id="icard"
      height="0"
      width="0"
      type="application/x-itst-activex"
      clsid="{A885513E-B0A6-4AF5-B20D-AE1F68F8DF02}"
    ></object>
    IC读卡器
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
      let icard = document.getElementById("icard");
	  icard.init(100);
	  let sta = icard.init(100)
	  console.log(sta)
    },
    startRecord() {
      let icard = document.getElementById("icard");
      icard.read();
      let data = icard.read();
      console.log(data);
    },
    stopRecord() {
      let icard = document.getElementById("icard");
      icard.uninit();
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



