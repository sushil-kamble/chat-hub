<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" small text>
          Forgot / Change Password
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Password Reset
        </v-card-title>

        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              class="mt-5"
              label="Email address"
              v-model="email"
              :rules="[rules.email]"
            ></v-text-field>
          </v-form>

          <span class="mt-3" v-if="feedback">{{ feedback }}</span>
          <div
            class="green--text mt-1"
            v-if="feedback === 'Email Successfully Sent'"
          >
            Email has been successfully sent to your email address. There will
            be a link which will redirect you to change password page. <br />
            You can close this dialog box now. <br />
            <v-btn
              class="mt-3"
              small
              block
              @click="closeDialog"
              href="https://mail.google.com/mail/"
              target="_blank"
            >
              TAKE ME TO MY GMAIL
            </v-btn>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="closeDialog">
            Close
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="
              loading = true;
              passwordReset();
            "
            :loading="loading"
          >
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { auth } from "@/firebase/init";

export default {
  name: "ForgotPass",
  data() {
    return {
      dialog: false,
      email: null,
      feedback: null,
      loading: false,
      rules: {
        email: v => this.validateEmail(v) || "Should be a valid email address."
      }
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    closeDialog() {
      this.dialog = false;
      this.feedback = null;
      this.email = null;
    },
    passwordReset() {
      if (this.email && this.validateEmail(this.email))
        auth
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.feedback = "Email Successfully Sent";
            this.email = null;
            this.loading = false;
            this.$refs.form.reset();
          })
          .catch(error => {
            console.log(error);
            this.feedback = error.message;
            this.loading = false;
          });
      else {
        this.feedback = "Please Check Your Email";
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped></style>
