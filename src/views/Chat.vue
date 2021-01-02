<template>
  <v-card>
    <OnlineBar />
    <Messages />
    <NewMessage />
  </v-card>
</template>

<script>
import OnlineBar from "@/components/layout/OnlineBar";
import { real, auth } from "@/firebase/init";
import Messages from "@/components/Messages";
import NewMessage from "@/components/NewMessage";
export default {
  components: { NewMessage, Messages, OnlineBar },
  beforeRouteEnter(to, from, next) {
    real
      .ref(`/groups/${to.params.id}`)
      .once("value")
      .then((snap) => {
        if (snap.exists()) {
          real
            .ref(`/users/${auth.currentUser.uid}/groups/${to.params.id}`)
            .once("value")
            .then((snap) => {
              if (snap.exists()) {
                next();
              } else {
                next(false);
              }
            });
        }
      });
  },
};
</script>

<style scoped></style>
