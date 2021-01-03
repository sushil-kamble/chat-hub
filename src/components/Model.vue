<template>
  <v-dialog
    v-model="dialog"
    width="400"
    :overlay-color="deleteGroup ? 'red darken-3' : 'blue-grey darken-1'"
    overlay-opacity="0.7"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :small="deleteGroup"
        :x-small="!deleteGroup"
        block
        color="error"
        v-bind="attrs"
        v-on="on"
      >
        {{ action }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="goldman-font">
        Are you sure?
      </v-card-title>

      <v-card-text class="roboto-font">
        <h4 v-if="deleteGroup">
          By doing this all the group chat will also be delete, Are you 100%
          sure?
        </h4>
        <h4 v-else>
          Are you sure you want to remove member?
        </h4>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="goldman-font">
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          small
          text
          @click="
            deleteGroup ? confirmDeleteGroup() : confirmDeleteMember();
            dialog = false;
          "
        >
          {{ deleteGroup ? "DELETE GROUP" : "REMOVE MEMBER" }}
        </v-btn>
        <v-btn @click="dialog = false" color="primary" small>
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { auth, real } from "@/firebase/init";

export default {
  name: "Model",
  props: ["action", "deleteGroup", "member", "length"],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    confirmDeleteGroup() {
      const path = real.ref();
      const remove = {};
      remove[`/groups/${this.$route.params.id}`] = null;
      remove[
        `/users/${auth.currentUser.uid}/groups/${this.$route.params.id}`
      ] = null;
      path.update(remove).then(() => {
        this.$router.replace({ name: "Group" });
      });
    },
    confirmDeleteMember() {
      const path = real.ref();
      const remove = {};
      remove[`/groups/${this.$route.params.id}/members/${this.member}`] = null;
      remove[`/users/${this.member}/groups/${this.$route.params.id}`] = null;
      path.update(remove);
    }
  }
};
</script>

<style scoped></style>
