<template>
  <div class="main start-app">
    <md-card>
      <md-card-header>
        <div class="md-title">
          <h1 class="welcome">受付をされる方は顔認証を実施してください。</h1>
        </div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout-item md-layout md-gutter">
          <div class="md-layout-item logo">
            <img alt="Vue logo" src="../assets/jcv.png" />
          </div>
          <div class="md-layout-item logo">
            <img alt="Vue logo" src="../assets/logo1.png" />
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "StartApp",
  props: {
    msg: String,
  },
  created() {
    this.$store.commit("checkAction");
    console.log(this.$store.state);
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
.logo img {
  display: block;
  margin: auto;
  width: 60%;
}
.start-app .welcome {
  line-height: 83px;
  width: 600px;
  margin: auto;
  margin-top: 100px;
}
</style>
