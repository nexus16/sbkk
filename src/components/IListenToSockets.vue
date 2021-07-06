<template>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <button @click="pingServer()">Ping Server</button>
  </div>
</template>

<script>
import io from 'socket.io-client';
export default {
  data() {
    return {
      isConnected: false,
      socketMessage: '',
      socket: io(),
    }
  },
  created() {
    this.socket.on('message', (data) => {
    console.log(data)
    })
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
    message(data) {
        console.log(data)
      this.socketMessage = data
    }
    
  },

  methods: {
    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.send('PING from client')
    }
  }
}
</script>