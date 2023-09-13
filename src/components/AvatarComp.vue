<template>
  <v-container
    fluid
  >
    <v-row justify="center">
      <v-menu
        bottom
        min-width="200px"
        rounded
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
          >
            <v-badge
                avatar
                bordered
                overlap
                >
            <template v-slot:badge>
            <v-avatar>
                <v-icon >mdi-cog-clockwise</v-icon>
            </v-avatar>
            </template>

            <v-avatar size="40">
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
            </v-avatar>
                </v-badge>
            </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
              >
                <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click="$router.push({name:'operators'})"
              >
                <v-icon color="black">mdi-human-edit</v-icon> Edit Accounts
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
              >
                <v-icon color="black">mdi-logout</v-icon> Disconnect
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      user: {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
      },
    }),
  }
</script>