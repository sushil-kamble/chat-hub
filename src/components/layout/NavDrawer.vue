<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      :absolute="isDesktop"
      dark
      :height="isDesktop ? 652 : windowSize.y"
      mobile-breakpoint="960"
      :permanent="isDesktop"
      v-if="user"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="goldman-font"> ChatHub </v-list-item-title>
          <v-list-item-subtitle class="roboto-font">
            Group Chat App
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav dense class="roboto-font">
        <v-list-item
          :style="`background-color: ${$vuetify.theme.currentTheme.primary}`"
        >
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-switch
              v-model="$vuetify.theme.dark"
              class="pa-0 ma-0 pl-1"
            ></v-switch>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="logout" class="mt-2">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Height Change for Mobile -->
    <v-app-bar dark dense app :absolute="isDesktop">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="!isDesktop && user"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="goldman-font">
        <v-btn
          text
          :to="user ? { name: 'Home' } : { name: 'Auth' }"
          v-if="!user"
        >
          Chat Hub
        </v-btn>
        <span v-else class="goldman-font">Chat Hub</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/about" v-if="!user">
        <v-icon>mdi-information</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { real, auth } from "@/firebase/init";
import { mapGetters } from "vuex";

export default {
  name: "NavDrawer",
  props: ["windowSize", "isDesktop"],
  data() {
    return {
      drawer: false,
      items: [
        { title: "Home", icon: "mdi-home", link: "/" },
        { title: "Groups", icon: "mdi-account-group", link: "/group" },
        { title: "About", icon: "mdi-information", link: "/about" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    logout() {
      real
        .ref("/status/" + this.user.id)
        .remove()
        .then(() => {
          auth.signOut().then(() => {
            this.$router.replace({ name: "Auth" });
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped></style>
