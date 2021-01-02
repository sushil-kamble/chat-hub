<template>
  <v-card
    class="overflow-y-auto"
    flat
    :height="$vuetify.breakpoint.smAndDown ? 'calc(100vh - (48px))' : 603"
    v-if="user"
  >
    <Info :user="user" />
    <GroupList :groups="user.groups" />
  </v-card>
</template>

<script>
import GroupList from "../components/GroupList";
import Info from "../components/Info";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    GroupList,
    Info
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  }
};
</script>
