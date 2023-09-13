<template>
<div class="box">
    <v-card
    class="d-inline-flex rounded-xl"
    elevation="5"
    >
    <div>
        <v-card  class="pa-8 ma-12" elevation="5">
                    <v-img
                        max-height="100"
                        max-width="110"
                        src="@/assets/logo.jpg"
                        class="mb-8"
                    ></v-img>
                    <p class="text-center">
                        <strong>Login to your account</strong> 
                    </p>
                    <v-text-field
                        v-model="pseudo"
                        label="Prepend"
                        prepend-icon="mdi-account"
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        prepend-icon="mdi-lock"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Normal with hint text"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                    ></v-text-field>
                    <p class="text-center">
                        <v-btn
                        depressed
                        color="error"
                        @click="login"
                        >
                        Sign up
                        </v-btn>
                    </p>
        </v-card>
    </div>
    <div>
      <v-card class="rounded-xl rounded-l-0">
        <v-carousel hide-delimiters :show-arrows="false" cycle >
            <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            >
            <v-img
             :src="item.src"
             :aspect-ratio="16/9"
             width="364"
             height="500"
             class="mb-8"
             gradient="to top right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)"
             >
             <div class="title flex-column text-center">
                <p style="color:white;font-size:30px;font-family:'Courier New'">
                    <b>{{item.title}}</b> 
                </p>
                <lot-tie :options="item.defaultOptions" :width="300" :height="300"/>
             </div>
             </v-img>
            </v-carousel-item>
        </v-carousel>
      </v-card>
      <Notification :type="status" :message="notificationMessage" :show="showNot"/>
    </div>
  </v-card>
  
</div>
</template>
<style scoped>

.box {
  position:absolute;
  top:0px;
  right:0px;
  bottom:0px;
  left:0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("@/assets/Background.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.title{
position:absolute;
  top:0px;
  right:0px;
  bottom:0px;
  left:0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<script>
import * as patientAnimation from "@/assets/animations/patient.json"
import * as appointmentAnimation from "@/assets/animations/appointment.json"
import * as accountingAnimation from "@/assets/animations/accounting.json"
import * as securityAnimation from "@/assets/animations/security.json"
import * as performanceAnimation from "@/assets/animations/performance.json"
import crypto from '../plugins/crypto'
import Notification from "../views/layout/Notification.vue"
export default {
  components: {
    Notification
  },
    data() {
        return {
            items: [
                {
                    src: "https://images.pexels.com/photos/4021773/pexels-photo-4021773.jpeg",
                    title: "MANAGE YOUR PATIENTS DATA",
                    defaultOptions: {
                        animationData: patientAnimation.default
                    },
                },
                {
                    src: "https://images.pexels.com/photos/4047072/pexels-photo-4047072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    title: "FOLLOW YOUR APPOINTMENT FROM DISTANCE",
                    defaultOptions: {
                        animationData: appointmentAnimation.default
                    },
                },
                {
                    src: "https://images.pexels.com/photos/3786124/pexels-photo-3786124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    title: "BENEFICE AN ACCOUNTING SYSTEM",
                    defaultOptions: {
                        animationData: accountingAnimation.default
                    },
                },
                {
                    src: "https://images.pexels.com/photos/4047184/pexels-photo-4047184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    title: "PROTECT YOUR DATA",
                    defaultOptions: {
                        animationData: securityAnimation.default
                    },
                },
                {
                    src: "https://images.pexels.com/photos/3683040/pexels-photo-3683040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    title: "EASE AND SPEED OF PERFORMANCE",
                    defaultOptions: {
                        animationData: performanceAnimation.default
                    },
                }
            ],
            show1: false,
            showNot: false,
            password: "your password",
            pseudo: "",
            status:'',
            notificationMessage:'',
            rules: {
                required: value => !!value || "Required.",
                min: v => v.length >= 2 || "Min 2 characters",
                emailMatch: () => (`The email and password you entered don't match`),
            },
        };
    },
    methods: {
        login() {
            const axios = require("axios").default;
            let data = {
                "login": this.pseudo,
                "pword": this.password
            };
            let config = { headers: { "content-type": "application/json" } };
            axios.post("http://192.168.1.68:4000/collab/login", data, config)
                .then(async (res) => {
                let _token = await crypto.encrypt(res.data[0].remember_token);
                localStorage.setItem("token", _token);
                this.$router.push('/dashboard');
            })
                .catch(error => {
                  this.lunchAlert('error',error.response.data,2000);
            });
        },
        lunchAlert(status,notificationMessage,delay){
          this.status = status;
          this.notificationMessage = notificationMessage
          this.showNot = true;
          setTimeout(() => {
              this.showNot = false;
          }, delay);
        }
    },
}
</script>