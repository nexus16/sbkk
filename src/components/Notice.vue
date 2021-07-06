<template>
  <div class="main">
    <md-card>
      <md-card-header>
        <div class="md-title">
          <h1>{{ header }}</h1>
        </div>
      </md-card-header>
      <md-card-content v-if="step == 0">
        <p>{{message}}</p>
			</md-card-content>
      <md-card-content v-if="step == 1">
        <!-- <p>{{message}}</p> -->
        <div class="md-layout-item md-layout md-gutter">
            <md-button class="md-raised md-primary" @click="goAttendant()"
              >受信の方</md-button
            >
        </div>
        <div class="md-layout-item md-layout md-gutter">
            <md-button class="md-raised md-primary" @click="goReception()"
              >付き添いの方</md-button
            >
				</div>
      </md-card-content>
      
      <md-card-content v-if="step == 2 && type == 'ATTENDANT'">
        <div class="md-layout-item md-layout md-gutter">
          <div class="md-layout-item logo">
            <md-button class="md-raised md-primary button-action" @click="goFirtExam()">初診</md-button>
          </div>
          <div class="md-layout-item logo">
            <md-button class="md-raised md-accent button-action" @click="goReExam()">再診</md-button>
          </div>
        </div>
        <div class="md-layout-item md-layout md-gutter">
          <div class="md-layout-item logo">
            <md-button class="md-raised md-success button-action" @click="renderQR()">QR</md-button>
          </div>
          <div class="md-layout-item logo">
            <md-button class="md-raised md-alert button-action" @click="callStaff()">呼出</md-button>
          </div>
        </div>
      </md-card-content>
			<md-card-content v-if="step == 2 && type == 'RECEPTION'">
        <p>{{ message }}</p>
        <div class="md-layout-item md-layout md-gutter">
          <div class="md-layout-item logo">
            <md-button class="md-raised md-primary" @click="goStep1()"
              >キャンセル</md-button
            >
          </div>
          <div class="md-layout-item logo">
            <md-button class="md-raised md-primary" @click="goStartApp()"
              >OK</md-button
            >
          </div>
        </div>
      </md-card-content>
			<md-card-content v-if="step == 2 && type == 'TIMEOUT'">
        <p>{{ message }}</p>
        <div class="md-layout-item md-layout md-gutter">
          <div class="md-layout-item logo">
            <md-button class="md-raised md-primary" @click="goStartApp()"
              >OK</md-button
            >
          </div>
        </div>
      </md-card-content>
      <md-card-content v-if="step == 3">
        <p>{{ message }}</p>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "Notice",
  data() {
    return {
      step: 1,
      type: "ATTENDANT",
      timeout: null,
      header: "XXX クリニック",
      message: "マスクを着用して再度体温を測定してください",
			autoGoTimeout: null,
    };
  },
  props: {
    msg: String,
  },
  created() {
    // this.$store.commit('startApp')
    if (this.$store.state.user_datas.temperature > 37 ||  !this.$store.state.user_datas.mask_status) {
			this.step = 0
			this.header = "XXX クリニック"
			if (this.$store.state.user_datas.temperature > 37) {
				this.message = "マスクを着用して再度体温を測定してください"
			}
			if (!this.$store.state.user_datas.mask_status) {
				this.message = "職員がまいります。その場でお待ちください"
			}
			var userData = {}
			this.$store.commit('setUserData', userData)
			this.autoToStarApp()
    } else if (this.$store.state.user_datas.temperature <= 37 && this.$store.state.user_datas.mask_status) {
			this.timeout = setTimeout(() => {
				console.log("go timeout")
				clearTimeout(this.timeout);
				this.timeout = null
				this.type = "TIMEOUT"
				this.step = 2
			}, 5000);
		}
  },
  updated() {
		if (this.timeout) {
			console.log("clear timeout")
      clearTimeout(this.timeout);
			this.timeout = null
		} 
		if (this.step == 1 || this.step == 2) {
			this.timeout = setTimeout(() => {
			console.log("go timeout")
			clearTimeout(this.timeout);
				this.timeout = null
				this.type = "TIMEOUT"
				this.goTimeOut()
			}, 5000);
		}
		
    
  },
  methods: {
    goReception() {
      this.step = 2;
      this.type = "RECEPTION";
    },
    goAttendant() {
      this.step = 2;
      this.type = "ATTENDANT";
    },
    goTimeOut() {
      this.step = 2;
      this.type = "TIMEOUT";
			this.header = "エラー";
			this.message = "長時間操作がなかった為、初期画面に戻ります";
			this.timeout = true;
			this.autoToStarApp()
    },
		goStep1() {
      this.step = 1;
      this.header = "XXX クリニック";
    },
    goStep3() {
      this.step = 2;
      this.timeout = true;
      this.header = "エラー";
      this.message = "長時間操作がなかった為、初期画面に戻ります";
    },
    goStartApp() {
      this.step = 1;
      this.header = "XXX クリニック";
      this.$store.commit("startApp");
    },
		goFirtExam() {
			// print ticket
			this.step = 3
			this.header = ""
			this.message = "受付番号をお取り下さい"
			this.autoToStarApp()
		},
		goReExam() {
			this.step = 3
			this.header = ""
			var data = null
			if (data) {
				this.message = "受付番号をお取り下さい"
			} else {
				this.message = "担当者をお呼びします。"
			}
			this.autoToStarApp()
		},
		renderQr() {

		},
		callStaff() {
			this.step = 3
			this.header = ""
			this.message = "担当者をお呼びします。"
			this.autoToStarApp()
		},
		autoToStarApp() {
			var timeoutGo = setTimeout(()=>{
				this.goStartApp()
				console.log("go StartApp")
				clearTimeout(timeoutGo)
		}, 3000)
		}
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
button.button-action {
  height: 128px;
  width: 300px;
  color: black !important;
  font-size: 50px;
}
</style>
