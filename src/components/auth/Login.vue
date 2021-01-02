<template>
  <div class="d-flex justify-center mt-4">
    <v-card width="600">
      <v-card-title class="blue-grey darken-3 white--text">
        <h1>Login</h1>
      </v-card-title>
      <v-form class="pa-4" @submit.prevent="login" autocomplete="off">
        <v-text-field
          label="Email address"
          v-model="email"
          :suffix="emailPostfixTemplate ? '@gmail.com' : ''"
        ></v-text-field>
        <v-text-field
          class="mb-2"
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          label="Password"
          @click:append="show1 = !show1"
        ></v-text-field>
        <div class="d-sm-flex justify-end my-3">
          <ForgotPass />
        </div>
        <h4 v-if="feedback" class="red--text my-2">
          {{ feedback }}
        </h4>
        <v-btn type="submit" color="secondary" :loading="loading" block>
          <v-icon left>mdi-login</v-icon>
          LOGIN
        </v-btn>
      </v-form>
      <div
        class="d-flex justify-space-between px-4 py-1 mt-2 blue-grey darken-3 white--text"
      >
        <h4 class="mt-1">Create Account?</h4>
        <v-btn @click="registerView" text dark>
          <v-icon left>mdi-login</v-icon>
          Register
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import { auth } from "@/firebase/init.js";
import ForgotPass from "@/components/auth/ForgotPass";

export default {
  name: "Login",
  components: {
    ForgotPass
  },
  data() {
    return {
      email: "",
      password: "",

      loading: false,
      show1: false,

      feedback: ""
    };
  },
  computed: {
    emailPostfixTemplate() {
      return this.email.search("@") === -1;
    }
  },
  methods: {
    emailPostfix() {
      if (this.email.search("@") !== -1) {
        // Pass
      } else if (this.email.slice(-10) !== "@gmail.com") {
        this.email = this.email + "@gmail.com";
      }
    },
    login() {
      if (this.email && this.password) {
        this.loading = true;
        this.emailPostfix();
        auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.feedback = "";
            this.loading = false;
            this.$router.replace({ name: "Home" });
          })
          .catch(err => {
            console.log(err);
            this.feedback = err.message;
            this.loading = false;
          });
      } else {
        this.feedback = "Please Enter Email / Password";
      }
    },
    registerView() {
      this.$emit("registerView");
    }
  }
};
</script>

<style></style>
