<template>
  <div class="main">
    <md-card>
      <md-card-header>
        <div class="md-title">
            受付をされる方は顔認証を実施してください。
        </div>
      </md-card-header>
        <md-card-content>
            <div class="md-layout-item md-layout md-gutter">
                <div class="md-layout-item logo">
                    <img alt="Vue logo" src="../assets/jcv.png">
                </div>
                <div class="md-layout-item logo">
                    <img alt="Vue logo" src="../assets/logo1.png">
                </div>
            </div>
        </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'StartApp',
  props: {
    msg: String
  },
  created() {
    this.$store.commit('startApp')
    console.log(this.$store.state)
  }
}
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
</style>
