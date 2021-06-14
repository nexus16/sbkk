<template>
  <div class="main check-customer">
    <md-card class="md-primary">
      <md-card-header>
        <div class="md-title">
            XXXクリニック
        </div>
      </md-card-header>
      <md-card-content>
        <div>
            <img class="avatar" src="../assets/jcv.png">
            <span>{{$store.state.user_datas.name}}</span>
        </div>
        <div>
            <span>温度:</span>
            <span>{{$store.state.user_datas.temperature}}</span>
        </div>
        <div>
            <span>マスク:</span>
            <span>{{$store.state.user_datas.mask_status}}</span>
        </div>
      </md-card-content>
      
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'CheckCustomer',
  props: {
    msg: String
  },
  created () {
    var goCheckAction = setTimeout(()=>{
      console.log("go checkAction")
      this.$store.commit('checkAction')
      clearTimeout(goCheckAction)
    }, 5000)
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
.check-customer .avatar{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>
