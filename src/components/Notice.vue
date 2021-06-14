<template>
  <div class="main">
    <md-card>
      <md-card-header>
        <div class="md-title">
            <p>{{header}}</p>
        </div>
      </md-card-header>
        <md-card-content  v-if="step == 1">
            <!-- <p>{{message}}</p> -->
            <div class="md-layout-item md-layout md-gutter">
                <div class="md-layout-item text-left">
                    <span>受信の方</span>
                </div>
                <div class="md-layout-item text-right">
                    <md-button class="md-raised md-primary" @click="goStep3()">Primary</md-button>
                </div>
            </div>
            <div class="md-layout-item md-layout md-gutter">
                <div class="md-layout-item text-left">
                    <span>付き添いの方</span>
                </div>
                <div class="md-layout-item text-right">
                    <md-button class="md-raised md-primary" @click="goStep2()">Primary</md-button>
                </div>
            </div>
        </md-card-content>
        <md-card-content  v-if="step == 2">
            <p>{{message}}</p>
            <div class="md-layout-item md-layout md-gutter">
                <div class="md-layout-item logo">
                    <md-button class="md-raised md-primary">キャンセル</md-button>
                </div>
                <div class="md-layout-item logo">
                    <md-button class="md-raised md-primary">OK</md-button>
                </div>
            </div>
        </md-card-content>
        <md-card-content  v-if="step == 3">
            <div class="md-layout-item md-layout md-gutter">
                <div class="md-layout-item logo">
                    <md-button class="md-raised md-primary button-action">初診</md-button>
                </div>
                <div class="md-layout-item logo">
                    <md-button class="md-raised md-accent  button-action">再診</md-button>
                </div>
            </div>
            <div class="md-layout-item md-layout md-gutter">
                <div class="md-layout-item logo">
                    <md-button class="md-raised md-success  button-action">QR</md-button>
                </div>
                <div class="md-layout-item logo">
                    <md-button class="md-raised md-alert  button-action">呼出</md-button>
                </div>
            </div>
        </md-card-content>
        <md-card-content v-if="step == 4">
            <p>{{message}}</p>
        </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  data() {
    return {
      step: 1,
      timeout: false,
      header: "XXX クリニック",
      message: "マスクを着用して再度体温を測定してください",
    }
  },
  props: {
    msg: String
  },
  created() {
    // this.$store.commit('startApp')
    if (this.$store.state.user_datas.temperature > 37 ||  !this.$store.state.user_datas.mask_status) {
        var userData = {}
        this.$store.commit('setUserData', userData)
        var goStartApp = setTimeout(()=>{
            console.log("go StartApp")
            this.$store.commit('startApp')
            clearTimeout(goStartApp)
        }, 3000)
    }
    if (this.$store.state.user_datas.temperature <= 37 &&  this.$store.state.user_datas.mask_status) {
        var autoGoStep2 = setTimeout(()=>{
            this.goStep3()
            clearTimeout(autoGoStep2)
        }, 10000)
    }
  },
  methods: {
      goStep2() {
          this.step = 2
          this.header = ""
          this.message = "個人情報の同意事項"
          this.timeout = false
      },
      goStep3() {
            this.step = 2
            this.timeout = true
            this.header = "エラー"
            this.message = "長時間操作がなかった為、初期画面に戻ります"
      }
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
.text-left {
    text-align: left;
}
.text-right {
    text-align: right;
}
.md-success {
    background: #a5d6a7 !important;
}
.md-alert {
    background: #fff59d !important;
}
button.button-action  {
    height: 128px;
    width: 300px;
    color: black !important;
    font-size: 50px;
}
</style>
