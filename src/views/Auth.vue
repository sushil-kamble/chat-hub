<template>
  <div>
    <div v-if="toggle">
      <Login @registerView="toggle = !toggle" />
    </div>

    <div v-else>
      <Register @loginView="toggle = !toggle" />
    </div>
  </div>
</template>

<script>
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import { auth } from "@/firebase/init.js";

export default {
  name: "Auth",
  components: {
    Login,
    Register
  },
  data() {
    return {
      toggle: true
    };
  },
  beforeRouteEnter(to, from, next) {
    if (auth.currentUser) {
      next({ name: "Home" });
    } else {
      next();
    }
  }
};
</script>

<style scoped></style>
