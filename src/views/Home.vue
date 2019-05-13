<template>
    <div class="home container fill-height fluid mr-0 pa-0">
      <v-layout justify-center align-center class="my-0">

        <v-carousel hide-delimiters>
            <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
        </v-carousel>
      </v-layout>
    </div>
</template>

<script>

import p1 from '../assets/1.png'

export default {
  data() {
    return {
       items: [
          {
            src: p1
          },
          // {
          //   src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
          // },
          // {
          //   src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
          // },
          // {
          //   src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
          // },
          // {
          //   src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
          // }
        ]
    }
  }
}
</script>

<style scoped>
.homea {
    background-image: url('../assets/BG.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    -o-background-size: 100% 100%, auto;
    -moz-background-size: 100% 100%, auto;
    -webkit-background-size: 100% 100%, auto;
    background-size: 100% 100%, auto;
}
</style>
