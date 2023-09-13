<template>
    <v-app>
        <div>
        <h1>
            accounting Page
        </h1>
        <v-container
    class="px-0"
    fluid
  >
    <v-radio-group v-model="radioGroup">
      <v-radio
        label="non"
        :value="false"
      ></v-radio>
      <v-radio
        label="oui"
        :value="true"
      ></v-radio>
    </v-radio-group>
    <v-btn @click="al">
        alert
    </v-btn>
  </v-container>
    </div>
    </v-app>
</template>
<script>
    export default {
        name:'AccountingView',
        methods: {
            al(){
                alert(this.radioGroup ? 'oui' : 'non')
            }
        },
        data () {
      return {
        radioGroup: 'o' != 'o',
      }
    },
    }
</script>