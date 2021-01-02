<template>
  <v-form @submit.prevent="sendMessage" autocomplete="off">
    <v-text-field
      label="Regular"
      placeholder="Enter Message..."
      v-model="message"
      append-icon="mdi-send"
      @click:append="sendMessage"
      class="mx-6"
      solo-inverted
    ></v-text-field
  ></v-form>
</template>

<script>
import { real, auth } from "@/firebase/init";
import moment from "moment";

export default {
  name: "NewMessage",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    sendMessage() {
      real
        .ref(`groups/${this.$route.params.id}/messages`)
        .push({
          sender: auth.currentUser.uid,
          senderName: auth.currentUser.displayName,
          message: this.message,
          timestamp: moment().format()
        })
        .then(() => {
          this.message = "";
        });
    }
  }
};
</script>

<style scoped></style>
