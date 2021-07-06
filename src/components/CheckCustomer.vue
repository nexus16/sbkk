<template>
  <div class="main check-customer">
    <md-card
      :class="
        $store.state.user_datas.temperature <= 37 &&
        $store.state.user_datas.mask_status
          ? 'pass-bgr'
          : 'fail-bgr'
      "
    >
      <md-card-header>
        <div class="md-title">
          <h1>XXXクリニック</h1>
        </div>
      </md-card-header>
      <md-card-content>
        <div class="user-info">
          <img class="avatar" src="../assets/jcv.png" />
          <span style="margin-left: 25px">{{ $store.state.user_datas.name }}</span>
        </div>
        <div class="user-info">
          <span>温度:</span>
          <span style="margin-left: 10px">{{ $store.state.user_datas.temperature }}</span>
        </div>
        <div class="user-info">
          <span>マスク:</span>
          <span style="margin-left: 10px" v-if="$store.state.user_datas.mask_status">o</span>
          <span style="margin-left: 10px" v-else>x</span>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "CheckCustomer",
  props: {
    msg: String,
  },
  created() {
    var goCheckAction = setTimeout(() => {
      console.log("go checkAction");
      this.$store.commit('checkAction')
      clearTimeout(goCheckAction);
    }, 5000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  width: 768px;
  margin: auto;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.check-customer .pass-bgr {
  background-color: #a5d6a7;
  color: black;
}
.check-customer .fail-bgr {
  background-color: #ef9a9a;
  color: black;
}
.check-customer .user-info {
  height: 100px;
  line-height: 80px;
  font-size: 50px;
}
.check-customer .avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>
