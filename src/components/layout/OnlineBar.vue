<template>
  <v-app-bar dense color="secondary">
    <h3 class="goldman-font ml-3 white--text">{{ $route.params.id }}</h3>
    <v-spacer></v-spacer>
    <StatusModel />
  </v-app-bar>
</template>

<script>
import { real, auth } from "@/firebase/init";
import StatusModel from "@/components/StatusModel";
import moment from "moment";
export default {
  name: "OnlineBar",
  components: {
    StatusModel
  },
  mounted() {
    const userStatusDatabaseRef = real.ref("/status/" + auth.currentUser.uid);
    const elRef = userStatusDatabaseRef.push(moment().format());
    real
      .ref("/users/" + auth.currentUser.uid)
      .onDisconnect()
      .update({
        timestamp: moment().format()
      });
    elRef
      .onDisconnect()
      .remove()
      .then(() => {
        real
          .ref("/users/" + auth.currentUser.uid)
          .update({
            timestamp: moment().format()
          })
          .then(() => {
            // // TODO: IF ACTIVITY NULL UPDATE TEMPLATE
            // // TELL THE USER TO RELOAD
            //
            // userStatusDatabaseRef.on("value", snapshot => {
            //   this.activity = snapshot.val();
            // });
            // console.log(Object.keys(this.activity).length);
            // if (Object.keys(this.activity).length >= 10) {
            //   real.ref("/status/" + uid).update({
            //     activity: null
            //   });
            // }
          });
      });
  }
};
</script>

<style scoped></style>
