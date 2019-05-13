<template>
  <v-card :color="getStatusColor(status)" width="125" height="125">
    <img width="125" height="100" :src="`http://${baseHost}:3000${pic}`" />
    <p class="caption font-weight-black black--text">{{name}}</p>
  </v-card>
</template>
<script>
export default {
  props: {
    name: String,
    pic: String,
    status: Number
  },
  data() {
    return {
      baseHost: location.hostname
    }
  },
  methods: {
    getStatusColor(val){
      if(val == 1){
        return 'green'
      } else if( val == 2){
        return 'yellow'
      } else
        return 'red'
    }
  }
}
</script>
