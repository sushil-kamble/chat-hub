<template>
  <v-card
    class="overflow-y-auto"
    :height="$vuetify.breakpoint.smAndDown ? 'calc(100vh - (48px))' : 603"
  >
    <div>
      <v-toolbar dense>
        <template>
          <v-tabs v-model="tab" centered grow>
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab v-for="item in items" :key="item">
              <h6 class="goldman-font">{{ item }}</h6>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat class="pa-6">
            <v-form @submit.prevent="createGroup">
              <v-text-field
                v-model="groupName"
                :counter="10"
                label="Group Name"
                required
              ></v-text-field>

              <v-btn
                color="primary"
                type="submit"
                class="goldman-font"
                small
                block
              >
                Create Group
              </v-btn>
            </v-form>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="pa-6">
            <v-form @submit.prevent="joinGroup">
              <v-text-field
                v-model="groupPassKey"
                label="Group Pass"
                required
              ></v-text-field>
              <v-btn
                color="primary"
                class="goldman-font"
                type="submit"
                small
                block
              >
                Join Group
              </v-btn>
            </v-form>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <h4 class="text-center roboto-font red--text">
        {{ feedback }}
      </h4>
    </div>
    <div>
      <v-skeleton-loader
        class="mx-auto"
        type="card-heading"
        v-if="!user"
      ></v-skeleton-loader>
      <GroupList class="px-3" :groups="user.groups" v-else />
    </div>
  </v-card>
</template>

<script>
import { real } from "@/firebase/init";
import { mapGetters } from "vuex";
import moment from "moment";
import GroupList from "@/components/GroupList";
export default {
  name: "Group",
  components: { GroupList },
  data() {
    return {
      tab: null,
      groupName: "",
      groupPassKey: "",
      groups: [],
      feedback: "",
      items: ["Create Group", "Join Group"]
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
    // Add your computed properties here
  },
  methods: {
    createGroup() {
      const groupPath = real.ref(`groups/${this.groupName}`);
      groupPath.once("value").then(snap => {
        if (snap.exists()) {
          this.feedback = "Group is Already Present";
        } else {
          const create = {};
          create["/groups/" + this.groupName + "/info"] = {
            name: this.groupName,
            createdAt: moment().format(),
            createdBy: this.user.id
          };
          create["/groups/" + this.groupName + "/members/" + this.user.id] = {
            memberId: this.user.id,
            memberName: this.user.name,
            dateJoined: moment().format()
          };
          create["/users/" + this.user.id + "/groups/" + this.groupName] = {
            gpName: this.groupName,
            owner: true
          };
          real
            .ref()
            .update(create)
            .then(() => {
              this.$router.push({
                name: "Chat",
                params: { id: this.groupName }
              });
              this.groupName = "";
              this.feedback = "";
            });
        }
      });
    },
    joinGroup() {
      const memberPath = real.ref(
        `groups/${this.groupPassKey}/members/${this.user.id}`
      );
      memberPath.once("value").then(span => {
        if (span.exists()) {
          this.$router.push({
            name: "Chat",
            params: { id: this.groupPassKey }
          });
          this.feedback = "";
        } else {
          const groupPath = real.ref(`groups/${this.groupPassKey}`);
          groupPath.once("value").then(snap => {
            if (snap.exists()) {
              const join = {};
              join[
                "/groups/" + this.groupPassKey + "/members/" + this.user.id
              ] = {
                memberId: this.user.id,
                memberName: this.user.name,
                dateJoined: moment().format()
              };
              join[
                "/users/" + this.user.id + "/groups/" + this.groupPassKey
              ] = {
                gpName: this.groupPassKey,
                owner: false
              };
              real
                .ref()
                .update(join)
                .then(() => {
                  this.$router.push({
                    name: "Chat",
                    params: { id: this.groupPassKey }
                  });
                  this.groupPassKey = "";
                  this.feedback = "";
                });
            } else {
              this.feedback = "Wrong Key";
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped></style>
