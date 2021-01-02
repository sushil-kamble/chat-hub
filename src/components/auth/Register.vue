<template>
  <div class="d-flex justify-center mt-4">
    <v-card width="600">
      <v-card-title class="blue-grey darken-3 white--text">
        <h1>Register</h1>
      </v-card-title>
      <v-form class="pa-4" @submit.prevent="registerUser" autocomplete="off">
        <v-text-field
          label="Enter Name"
          :rules="[rules.required]"
          v-model="name"
          append-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          label="Email address"
          :rules="[rules.required, rules.email]"
          v-model="email"
          append-icon="mdi-email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="showPass ? 'text' : 'password'"
          label="Password"
          hint="At least 6 characters"
          counter
          @click:append="showPass = !showPass"
        ></v-text-field>
        <v-text-field
          class="mb-2"
          append-icon="mdi-lock"
          :counter="password.length"
          :rules="[rules.required, rules.passwordConfirmation]"
          type="password"
          v-model="confirmPassword"
          label="Confirm Password"
        ></v-text-field>
        <h4 v-if="feedback" class="red--text text-center my-2">
          {{ feedback }}
        </h4>
        <v-btn type="submit" color="secondary" :loading="loading" block>
          <v-icon left>mdi-file-edit</v-icon>
          Register
        </v-btn>
      </v-form>
      <div
        class="d-flex justify-space-between px-4 py-1 mt-2 blue-grey darken-3 white--text"
      >
        <h4 class="mt-1">Already Registered?</h4>
        <v-btn @click="loginView" text dark>
          <v-icon left>mdi-login</v-icon>
          Login
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import { auth, real } from "@/firebase/init.js";

export default {
  name: "Register",
  data() {
    return {
      name: null,
      password: "",
      confirmPassword: "",
      email: "",

      showPass: false,
      feedback: null,

      loading: false,

      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        email: v => this.validateEmail(v) || "Should be a valid email address.",
        passwordConfirmation: () =>
          this.validateConfirmPassword() || "Password does not match"
      }
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    validateConfirmPassword() {
      return this.password === this.confirmPassword;
    },
    async registerUser() {
      if (
        this.validateEmail(this.email) &&
        this.validateConfirmPassword() &&
        this.name
      ) {
        try {
          this.loading = true;
          const { user } = await auth.createUserWithEmailAndPassword(
            this.email,
            this.password
          );
          await this.$router.replace({ name: "Home" });
          await user.updateProfile({
            displayName: this.name
          });
          await real.ref("/users/" + user.uid).set({
            name: this.name
          });
          await this.$store.dispatch("fetchUser", user);
          this.feedback = "";
          this.loading = false;
        } catch (err) {
          this.feedback = err.message;
          this.loading = false;
        }
      }
    },
    loginView() {
      this.$emit("loginView");
    }
  }
};
</script>

<style></style>
