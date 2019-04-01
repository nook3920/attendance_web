<template>
  <v-container grid-list-xl fluid>
      <v-layout row wrap>
      <v-flex lg3 sm6 xs12>
        <real-time-camera></real-time-camera>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>

import RealTimeCamera from '../components/RealTimeCamera'

export default {
  components: {
    RealTimeCamera
  }
}
</script>
