<template>
<div class="d-flex">
  <v-container>
    <v-card  class="pa-1 ma-2">
          <strong>Profile</strong>
        </v-card>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card elevation="5" class="pa-2">
        <p><v-icon color="black">mdi-account-circle</v-icon> Edit Profile</p>
        <v-divider class="pa-3"></v-divider>
          <edit-profile></edit-profile>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card elevation="5" class="pa-2">
          <p><v-icon color="black">mdi-account-circle</v-icon> Edit Profile</p>
          <v-divider class="pa-3"></v-divider>
          <edit-profile></edit-profile>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card elevation="5" class="pa-2">
            <p><v-icon color="black">mdi-shield-lock</v-icon> Change Password</p>
            <v-divider class="pa-3"></v-divider>
            <change-password></change-password>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>
<script>

import EditProfile from './EditProfile.vue';
import ChangePassword from './ChangePassword.vue';
  export default {
      name: 'ProfileView',
      components: {
        EditProfile,
        ChangePassword
    },
    data: () => ({
    }),
    methods: {

    }
  }
</script>