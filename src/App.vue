<template>
  <v-app :class="isDesktop ? 'main-app' : ''" v-resize="onResize">
    <NavDrawer :windowSize="windowSize" :isDesktop="isDesktop" />
    <v-main>
      <div class="container--fluid">
        <!-- If using vue-router -->
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { auth, real } from "@/firebase/init";
import NavDrawer from "@/components/layout/NavDrawer";
export default {
  name: "App",
  components: { NavDrawer },
  data() {
    return {
      windowSize: {
        x: 0,
        y: 0,
      },
    };
  },
  computed: {
    isDesktop() {
      return this.windowSize.x > 960;
    },
  },
  mounted() {
    this.onResize();
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    logout() {
      real
        .ref("/status/" + auth.currentUser.uid)
        .remove()
        .then(() => {
          auth.signOut().then(() => {
            this.$router.push({ name: "Auth" });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  background: url("assets/chatbg.jpg");
}

.main-app {
  padding: 50px 60px 10px 60px;
}

.roboto-font {
  font-family: "Roboto Condensed", sans-serif;
}

.goldman-font {
  font-family: "Goldman", cursive;
}
</style>
