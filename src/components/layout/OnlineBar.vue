<template>
  <v-app-bar dense color="secondary">
    <h3 class="goldman-font ml-1">{{ $route.params.id }}</h3>
    <v-spacer></v-spacer>
    <AdminModel :admin="validateAdmin" />
    <StatusModel />
  </v-app-bar>
</template>

<script>
import { real, auth } from "@/firebase/init";
import StatusModel from "@/components/StatusModel";
import moment from "moment";
import AdminModel from "@/components/AdminModel";
export default {
  name: "OnlineBar",
  props: ["user"],
  components: {
    AdminModel,
    StatusModel
  },
  computed: {
    validateAdmin() {
      return (
        this.user.groups.filter(group => {
          return group.gpName === this.$route.params.id && group.owner;
        }).length > 0
      );
    }
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
