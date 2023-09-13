<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      dark
      class="Prussian"
      app
    >
      <v-list-item class="d-flex justify-center pa-1" >
        <div>
        <avatar-comp></avatar-comp>
        <v-list-item-title class="text_h1">
          John Leider 
        </v-list-item-title>
        </div>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item
          class="item"
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          :class="{'active':item.isActive}"
          link
          @click="activeBtn(item.title)"
        >
          <v-list-item-icon>
            <v-icon class="hov">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content >
              <v-list-item-title class="hov">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logOut">
            Logout&nbsp;
            <v-icon
              right
              dark
              >
            mdi-logout
          </v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      color="#43a047"
      dark
      app
      src="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(238,238,238,.7), rgba(2,41,77,.7)"
        ></v-img>
      </template>
      <v-btn icon>
        <v-icon color="#5783e2">mdi-symfony</v-icon>
      </v-btn>
      <v-app-bar-title>NO-MED CABINET MEDICAL</v-app-bar-title>
    </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
  </v-app>
</template>
<style scoped>
  .item {
    margin: 5px;
    border-radius: 4px;
  }
  .item:hover {
    background: #EDEDED;
  }
  .item:hover .hov{
    color: black;
  }
  .active {
    background: #B4C2C1;
  }
  .active .hov{
    color: black;
  }
</style>
<script>
import AvatarComp from './AvatarComp.vue'
export default {
  name: 'HomeComp',

  components: {
    AvatarComp
  },
  methods:{
    activeBtn(title){
      this.items.filter(t => t.title == title)[0].isActive = true
      this.items.filter(t => t.title != title).forEach((element)=>{element.isActive = false});
    },
    logOut(){
      this.$router.push({name:'login'})
    }
  },
  data(){
      return {
        drawer: null,
        items: [
          { title: 'Dashboard', icon: 'mdi-desktop-mac-dashboard',isActive:false,to:'/dashboard' },
          { title: 'Appointment', icon: 'mdi-calendar-multiselect',isActive:false,to:'/appointment' },
          { title: 'Accounting', icon: 'mdi-calculator-variant',isActive:false,to:'/accounting' },
          { title: 'Patiens', icon: 'mdi-account-group',isActive:false,to:'/patiens' },
          { title: 'Operators', icon: 'mdi-gesture-two-double-tap',isActive:false,to:'/profile' }
        ],
        mini: true,
      }
    },
    
};
</script>
