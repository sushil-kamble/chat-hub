<template>
  <div class="chat">
    <!--    TODO: Background of chat-->
    <v-card
      class="chat-container"
      flat
      :height="
        $vuetify.breakpoint.smAndDown
          ? 'calc(100vh - (48px + 56px + 80px))'
          : 467
      "
    >
      <!--      TODO: loading component for chats-->
      <!--      TODO: Auto scroll-->
      <v-list v-if="messages.length > 0 && user">
        <v-list-item-content>
          <v-list-item
            v-for="message in messages"
            :key="message.timestamp"
            :class="
              user.id === message.sender ? 'message-right' : 'message-left'
            "
          >
            <div
              :class="
                `message-text ${
                  user.id === message.sender ? 'rounded-bl-xl' : 'rounded-br-xl'
                }`
              "
              :style="
                `background-color: ${
                  user.id === message.sender ? themeColorPrimary : themeColorSec
                }`
              "
            >
              <h6 v-if="user.id !== message.sender" class="roboto-font">
                {{ message.senderName }}
              </h6>
              <h5>{{ message.message }}</h5>
              <h6>
                {{ formatDate(message.timestamp) }}
              </h6>
            </div>
          </v-list-item>
        </v-list-item-content>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import { real } from "@/firebase/init";
import { mapGetters } from "vuex";

export default {
  name: "Messages",
  data() {
    return {
      messages: []
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    }),
    themeColorPrimary() {
      return this.$vuetify.theme.currentTheme.primary;
    },
    themeColorSec() {
      return this.$vuetify.theme.currentTheme.secondary;
    }
    // Add your computed properties here
  },
  mounted() {
    real
      .ref(`groups/${this.$route.params.id}/messages`)
      .on("child_added", snap => {
        this.messages.push(snap.val());
      });
  },
  methods: {
    formatDate(date) {
      return moment(date).format("LT");
    }
  }
};
</script>

<style scoped>
.message-left .message-text {
  position: absolute;
  color: white;
  left: 0;
  padding: 5px 30px 5px 10px;
  margin-bottom: 6px;
}

.message-right .message-text {
  position: absolute;
  color: white;
  right: 0;
  padding: 5px 10px 5px 30px;
  margin-bottom: 6px;
}

.chat-container {
  padding-top: 10px;
  margin-bottom: 10px;
  overflow-y: scroll;
  padding-right: 16px;
  padding-left: 16px;
}

.chat-container::-webkit-scrollbar {
  width: 4px;
  color: #111;
}
.chat-container::-webkit-scrollbar-track {
  background: #ddd;
}
.chat-container::-webkit-scrollbar-thumb {
  background: #aaa;
}
</style>
