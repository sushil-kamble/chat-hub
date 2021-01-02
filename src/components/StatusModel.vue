<template>
  <v-dialog v-model="dialog" width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        class="goldman-font"
        dark
        small
        v-bind="attrs"
        v-on="on"
      >
        Status
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="goldman-font">
        {{ $route.params.id }}
      </v-card-title>

      <v-card-text>
        <v-skeleton-loader
          class="mx-auto"
          type="list-item"
          v-if="loadingState"
        ></v-skeleton-loader>
        <v-list v-else dense class="roboto-font">
          <v-list-item v-for="(member, val) in filterGroupMember" :key="val">
            <v-list-item-content>
              <v-list-item-title>
                {{ member.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action v-if="member.status">
              Online
            </v-list-item-action>
            <v-list-item-action v-else>
              {{ formatDate(member.lastActive) }}
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
import { real } from "@/firebase/init";
import { mapGetters } from "vuex";

export default {
  name: "StatusModel",
  data() {
    return {
      groupMembers: [],
      dialog: false,
      count: 0
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    }),
    loadingState() {
      return this.groupMembers.length !== this.count;
    },
    filterGroupMember() {
      if (this.user && this.groupMembers.length > 0) {
        return this.groupMembers.filter(val => {
          return val.id !== this.user.id;
        });
      } else {
        return [];
      }
    }
  },
  beforeUpdate() {
    this.groupMembers = [];
    this.count = 0;
    real.ref(`/groups/${this.$route.params.id}/members/`).on("value", snap => {
      snap.forEach(child => {
        this.count++;
        real.ref(`status/${child.val().memberId}`).on("value", stat => {
          if (stat.exists()) {
            const memberStat = {
              name: child.val().memberName,
              id: child.val().memberId,
              status: true
            };
            this.groupMembers.push(memberStat);
          } else {
            real.ref(`users/${child.val().memberId}`).on("value", active => {
              const memberStat = {
                name: child.val().memberName,
                id: child.val().memberId,
                status: false,
                lastActive: active.val().timestamp
              };
              this.groupMembers.push(memberStat);
            });
          }
        });
      });
    });
  },
  methods: {
    formatDate(date) {
      return moment(date).fromNow();
    }
  }
};
</script>
