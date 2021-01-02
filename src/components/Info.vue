<template>
  <v-card class="pa-5 d-flex justify-space-between align-center">
    <h3 class="goldman-font">{{ user.name }}</h3>
    <div>
      <h5 class="goldman-font">{{ formatDate(user.timestamp) }}</h5>
      <h6 class="roboto-font">Last message viewed at</h6>
    </div>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  name: "Info",
  props: ["user"],
  methods: {
    formatDate(date) {
      return moment(date).format("lll");
    }
  }
};
</script>
