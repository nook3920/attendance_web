<template>
    <v-card class="mx-auto elevation-5" color="#718792" dark width="75%">
        <v-card-title class="white--text blue lighten-2">
            <span class="title font-weight-black text-uppercase">{{classroom.subject}}</span>
        </v-card-title>
        <v-card-text class="title font-weight-bold">
            <p>อาจารย์ : {{ classroom.teacher.name}}</p>
            <p>start : {{ classroom.start | toLocalTime}} end : {{ classroom.end | toLocalTime}}</p>
            <p>now: {{ timeNow | toLocalTime}} </p>
            <!-- <p>{{ timeCount }}</p> -->
            <!-- <v-progress-linear
              :color="getColor(timeCount)"
              :value="timeCount"
              :width="15"
              :height="15"
              background-color="blue lighten-3"
              ></v-progress-linear></v-progress-linear> -->
              <v-layout row wrap v-if="isClassDay && isClassTime">
              <v-flex lg2 xs4 md3 v-for="a in att" :key="a._id">
                <pic-card :name="a.studentid.name" :pic="a.picture" :status="a.status"></pic-card>
                <v-btn @click="endclass">end class</v-btn>
              </v-layout>
            <!-- <div v-if="!isClassDay || !isClassTime"><p>class not start yet</p></div>
            <div v-else>
              <p>class start {{ isClassTime }}</p>
              
            </div> -->
        </v-card-text>
    </v-card>
</template>

<script>
import PicCard from './PicCard'
import io from "socket.io-client"
const days = { 0: "sunday", 1: "monday", 2: "tuesday", 3: "wednesday", 4: "thursday", 5: "friday", 6: "saturday" }
function timeToMinutes(time) {
  const h = time.getHours()
  const m = time.getMinutes()
  const timeInMinutes = ((h * 60*60) + m*60) 
  return timeInMinutes 
}

function maps(now, start, end) {

  return Math.floor((now - start) * (100 - 0) / (end - start))
}
export default {
    components: {
      PicCard
    },
    props: {
        classId: String
    },
    data() {
        return {
            classroom: {},
            timeCount: 0,
            timer: null,
            late: 0,
            att: [],
            socket: io('localhost:3000'),
            timeNow: new Date()
        }
    },
    mounted() {
      this.socket.on('ATT', data => {
        console.log(data)
        this.att = [...this.att, data]
      })
    },
    methods: {

        getClassroom() {
            this.$http
                .get(`/class/${this.classId}`)
                .then(res => {
                    // console.log(res.data)
                    this.classroom = res.data
                    let now = timeToMinutes(new Date())
                    let start = timeToMinutes(new Date(res.data.start))
                    let end = timeToMinutes(new Date(res.data.end))
                    const ratio = (end - start) / 100
                    this.late = Math.floor( (res.data.late*60)/ratio)
                    console.log(now, start, end, ratio, this.late)
                    this.timeCount = Math.floor( (now-start)/ratio)
                    this.timer = setInterval(() => this.countUp(), ratio*1000)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        countUp() {
          this.timeCount = this.timeCount += 1
        },
        getColor(val) {
          if(val > 100 || val < 0)
            return 'red'
          else if(val > this.late && val < 100)
            return 'yellow'
          else
            return 'green'
        },
        getAtt() {
          this.$http
              .get(`/attbydate/${this.classId}`)
              .then(res => {
                console.log(res.data)
                this.att = res.data
              })
              .catch(err => {
                console.log(err)
              })
        },
        endclass() {
          this.$http.post('/classend', { classId: this.classId })
          .then(res => {
            console.log('end class success')
          })
          .catch(err => {
            console.log('err!!!!!!')
          })
          
        }
    },
    created() {
        this.getClassroom()
        // this.timer = setInterval(() => this.countUp(), 1000)
        setInterval(() => this.timeNow = new Date, 1000)
        this.getAtt()
        
    },
    computed: {
      isClassDay() {
        let dnow = new Date().getDay()
        return this.classroom.day == days[dnow]
      },
      isClassTime() {
        let dnow = new Date()
        let ddNow = timeToMinutes(dnow)
        let dStart = new Date(this.classroom.start)
        let classStart = timeToMinutes(dStart)
        let dEnd = new Date(this.classroom.end)
        let classEnd = timeToMinutes(dEnd)
        return ddNow >= classStart && ddNow <= classEnd
      }
      
    },
    filters: {
      toLocalTime: function(value) {
      const a = new Date(value)
      return a.toLocaleTimeString()
      }
    }
}
</script>
