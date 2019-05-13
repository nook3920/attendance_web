<template>
    <v-container grid-list-xl fluid>
        <v-layout row wrap justify-center >
            <v-flex lg8>
                <v-layout row wrap v-if="!classId">
                    <v-flex lg4 v-for="classroom in classrooms" :key="classroom._id">
                        <v-hover>
                            <v-card
                                dark
                                slot-scope="{ hover }"
                                color="#718792"
                                :class="`elevation-${hover ? 12 : 2} justify-center ml-5` "
                                width="80%"
                                @click="gotoClass(classroom._id)"
                            >
                                <v-card-title primary-title class="blue lighten-2">
                                    <div>
                                        <div class="headline font-weight-black">{{classroom.subject}}</div>
                                    </div>
                                </v-card-title>
                                <v-card-text class="subheading">
                                    <span>Teacher: {{classroom.teacher.name}}</span>
                                    <div>students: {{ classroom.students | countArray }}</div>
                                    <div>start: {{ classroom.start | toLocalTime}}</div>
                                    <div>end: {{ classroom.end | toLocalTime}}</div>
                                    <div>day: {{ classroom.day}}</div>
                                </v-card-text>
                                <v-card-actions>
                                    <!-- <v-btn color="cyan lighten-2"  @click="goEditClass(classroom._id)">แก้ไข<v-icon right>build</v-icon></v-btn> -->
                                </v-card-actions>
                            </v-card>
                        </v-hover>
                    </v-flex>
                </v-layout>
                <v-layout v-else>
                  <real-time-class :classId="classId"></real-time-class>
                </v-layout>
            </v-flex>
            <v-flex lg2 align-self-center>
                <real-time-camera cameraNum="1"></real-time-camera>
            </v-flex>
            <v-flex lg2 align-self-center>
                <real-time-camera cameraNum="2"></real-time-camera>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import RealTimeCamera from '../components/RealTimeCamera'
import RealTimeClass from '../components/RealTimeClass'
export default {
    components: {
        RealTimeCamera,
        RealTimeClass
    },
    data() {
        return {
            classrooms: []
        }
    },
    methods: {
        getClassroom() {
            this.$http
                .get('/class')
                .then(res => {
                    this.classrooms = res.data
                })
                .catch(err => {})
        },
        gotoClass(cid) {
          this.$router.push({name: 'DashBoards', params: { id: cid}})
        }
    },
    created() {
        this.getClassroom()
        console.log(this.$route.params.id)
    },
    computed:{
      classId() {
        return this.$route.params.id
      }
    },
    filters: {
        countArray: function(value) {
            return value.length
        },
        toLocalTime: function(value) {
            const a = new Date(value)
            return a.toLocaleTimeString()
        }
    }
}
</script>
