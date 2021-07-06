<template>
  <div id="app">
    <StartApp v-if="$store.state.step1_start_app"/>
    <CheckCustomer v-if="$store.state.step2_check_customer"/>
    <Notice v-if="$store.state.step3_check_action"/>
    <IListenToSockets />
  </div>
</template>

<script>
import StartApp from './components/StartApp.vue'
import CheckCustomer from './components/CheckCustomer.vue'
import Notice from './components/Notice.vue'
import io from 'socket.io-client';

import IListenToSockets from './components/IListenToSockets.vue'

export default {
  name: 'App',
  components: {
    StartApp,
    CheckCustomer,
    Notice,
    IListenToSockets,
  },
  data() {
    return {
      isConnected: false,
      socketData: '',
      socket: io(),
    }
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    dataFromServer(data) {
        console.log(data)
      this.socketData = data
      var userData = {
        name: "A様",
        temperature: 36,
        mask_status: 1
      }
      this.$store.commit('setUserData', userData)
      this.$store.commit('checkCustomer')
    }
    
  },
  created() {
    this.$store.commit('checkCustomer')
    console.log(this.$store.state)
    this.socket.on('dataFromServer', (data) => {
      console.log(data)
    })
    var userData = {
        name: "A様",
        temperature: 36,
        mask_status: 0
      }
    this.$store.commit('setUserData', userData)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.md-card {
  height: 550px;
}
</style>
