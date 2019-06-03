<template>
  <v-card width="160" height="760" dark>
    <v-card-title class="white--text blue lighten-2 pa-0 justify-center" >
      <p class="headline">Camera{{cameraNum}}</p>
    </v-card-title>
      <v-slide-y-transition 
        class="py-0 row wrap "
        group
        tag="v-layout"
        >
        <v-flex v-for="dd in cameraList" :key="dd.id" xs12>
          <div class="layout column ml-4 " >
            <p class=" mb-0">{{ dd.name }}</p>
            <img :src="dd.picture" width="100" height="120" />
          </div>
          </v-flex>
      
      </v-slide-y-transition>
    
  </v-card>
</template>

<script>

import io from "socket.io-client"

export default {
  props: {
    cameraNum: String
  },
  data() {
    return {
      nameList: [],
      socket: io('localhost:3000'),
      cameraList: [],
      
    }
  },
  mounted(){
    
    this.socket.on(`camera${this.cameraNum}`, data => {
      
      
      let bytes = new Uint8Array(data.pic)
      let binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '')
      const src = "data:image/jpeg;base64," + binary
      // this.cameraList.push({id:data.id, name: data.name, picture: src})
      if(this.cameraList.length > 4){
        this.cameraList.pop()
      }
      this.cameraList = [{id:data.id, name: data.name, picture: src}, ...this.cameraList]
      // this.src = 'data:image/jpeg;base64,' + data.pic
      // console.log(this.src)
    })
  }
}
</script>
