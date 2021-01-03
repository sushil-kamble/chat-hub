<template>
  <v-dialog v-model="dialog" width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :color="$vuetify.theme.dark ? 'blue-grey darken-4' : 'orange lighten-5'"
        class="goldman-font mr-4"
        x-small
        v-bind="attrs"
        v-on="on"
      >
        {{ admin ? "Admin" : "Leave" }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="goldman-font">
        {{ $route.params.id }}
      </v-card-title>

      <v-card-text v-if="admin">
        <v-list dense class="roboto-font">
          <v-list-item v-for="member in filterGroupMember" :key="member.id">
            <v-list-item-content>
              <v-list-item-title>
                {{ member.memberName }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <Model
                action="REMOVE"
                :deleteGroup="false"
                :member="member.memberId"
              />
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-if="admin && groupDescription">
            <v-list-item-content>
              <v-list-item-title>
                Created At
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              {{ parseDate(groupDescription.createdAt) }}
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <Model
          action="DELETE THIS GROUP"
          :deleteGroup="true"
          v-if="filterGroupMember.length === 0"
        />
        <div v-else class="pa-2 roboto-font text-center subtitle-2 red--text">
          To Delete this group you should remove all members first.
        </div>
      </v-card-text>
      <v-card-text v-else class="red--text roboto-font">
        Are you sure you have to leave this group.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="goldman-font">
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false" v-if="admin">
          Close
        </v-btn>
        <div v-else>
          <v-btn
            color="error"
            text
            @click="
              dialog = false;
              leaveGroup();
            "
            small
          >
            Leave
          </v-btn>
          <v-btn color="primary" text @click="dialog = false" small>
            Close
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { real } from "@/firebase/init";
import moment from "moment";
import Model from "@/components/Model";

export default {
  name: "AdminModel",
  components: { Model },
  props: ["admin"],
  data() {
    return {
      dialog: false,
      groupMembers: [],
      groupDescription: null
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    }),
    filterGroupMember() {
      if (this.user && this.groupMembers.length > 0) {
        return this.groupMembers.filter(val => {
          return val.memberId !== this.user.id;
        });
      } else {
        return [];
      }
    }
  },
  mounted() {
    real
      .ref(`/groups/${this.$route.params.id}/info/`)
      .once("value")
      .then(span => {
        this.groupDescription = span.val();
      });
  },
  beforeUpdate() {
    this.count = 0;
    this.groupMembers = [];
    real.ref(`/groups/${this.$route.params.id}/members/`).on("value", snap => {
      snap.forEach(child => {
        this.groupMembers.push(child.val());
      });
    });
  },
  methods: {
    formatDate(date) {
      return moment(date).fromNow();
    },
    parseDate(date) {
      return moment(date).format("lll");
    },
    leaveGroup() {
      const path = real.ref();
      const remove = {};
      remove[`/groups/${this.$route.params.id}/members/${this.user.id}`] = null;
      remove[`/users/${this.user.id}/groups/${this.$route.params.id}`] = null;
      path.update(remove).then(() => {
        this.$router.replace({ name: "Group" });
      });
    }
  }
};
</script>

<style scoped></style>
