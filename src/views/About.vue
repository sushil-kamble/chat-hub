<template>
  <v-card
    class="overflow-y-auto"
    flat
    :height="$vuetify.breakpoint.smAndDown ? 'calc(100vh - (48px))' : 603"
  >
    <h2 class="goldman-font pt-2 pl-3">Hi, I am Sushil Kamble</h2>
    <hr />
    <h3 class="goldman-font ml-3 mt-3 text-decoration-underline">
      Getting Started
    </h3>

    <div class="roboto-font px-3">
      This is a group chat application. You can create a group from Groups Tab
      and you can also join your friends group by just typing the group key
      which will be given to you from one of the group member.
    </div>
    <h3 class="goldman-font ml-3 mt-3 text-decoration-underline">
      Features
    </h3>
    <div class="roboto-font ml-3">
      <ul>
        <li>Realtime Chat sync</li>
        <li>Responsive & Simple UI</li>
        <li>Realtime Presence</li>
      </ul>
    </div>

    <h3 class="goldman-font ml-3 mt-3 text-decoration-underline">
      Technology Stack
    </h3>
    <div class="roboto-font ml-3">
      <ul>
        <li>
          <a target="_blank" href="https://vuejs.org/v2/guide/"
            >vue.js@2.6.11</a
          >
        </li>
        <li>
          <a target="_blank" href="https://router.vuejs.org/">
            vue-routers@3.2.0
          </a>
        </li>
        <li>
          <a target="_blank" href="https://vuex.vuejs.org/">vuex@3.4.0</a>
        </li>
        <li>
          <a target="_blank" href="https://vuetifyjs.com/en/">vuetify@2.2.11</a>
        </li>
        <li>
          <a target="_blank" href="https://firebase.google.com/docs/auth"
            >Firebase Authentication</a
          >
        </li>
        <li>
          <a target="_blank" href="https://firebase.google.com/docs/database"
            >Firebase Realtime Database</a
          >
        </li>
        <li>
          <a target="_blank" href="https://momentjs.com/">Moment@2.29.1</a>
        </li>
      </ul>
    </div>
  </v-card>
</template>
