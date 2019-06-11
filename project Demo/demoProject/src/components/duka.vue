<template>
  <div class="box">
    <object
      id="idCard"
      height="0"
      width="0"
      type="application/x-itst-activex"
      clsid="{A885513E-B0A6-4AF5-B20D-AE1F68F8DF01}"
    ></object>
    <!-- A885513E-B0A6-4AF5-B20D-AE1F68F8DF01 -->
    <button @click="initRecord">初始化</button>
    <button @click="startRecord">读卡</button>
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
    // appendRecorder() {
    //   if (document.getElementsByTagName("object").length > 0) return;
    //   let body = document.getElementsByTagName("body")[0];
    //   let obj = document.createElement("object");
    //   obj.setAttribute("id", "idCard");
    //   obj.setAttribute("type", "application/x-itst-activex");
    //   obj.setAttribute("width", 0);
    //   obj.setAttribute("height", 0);
    //   //   obj.setAttribute("classid", "clsid:A885513E-B0A6-4AF5-B20D-AE1F68F8DF01");
    //   obj.setAttribute("clsid", "{A885513E-B0A6-4AF5-B20D-AE1F68F8DF01}");
    //   body.appendChild(obj);
    // },
    initRecord() {
      let idCard = document.getElementById("idCard");
      //   idCard.windowCount = 2;
      //   idCard.host = '192.168.11.236';
      //   idCard.port = '9000';
      //   idCard.username = 'system';
      //   idCard.password = '123456';
      //   idCard.row = 3;
      //   idCard.column = 3;
      idCard.init();
      let num = idCard.init();
      console.log(num);
    },
    startRecord() {
      // let timer = window.setInterval(this.read, 100);
      //   let idCard = document.getElementById("idCard");
      //   idCard.read();
      //   this.obj = idCard.read();
      //   console.log(this.obj);
      let idCard = document.getElementById("idCard");
      idCard.read();
      this.obj = idCard.read();
      console.log(this.obj);
    },
    read() {
      let idCard = document.getElementById("idCard");
      idCard.read();
      this.obj = idCard.read();
      console.log(this.obj);
    },
    stopRecord() {
      let idCard = document.getElementById("idCard");
      idCard.stop();
    },
    callback(action, state, msg) {}
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



