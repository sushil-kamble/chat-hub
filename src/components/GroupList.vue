<template>
  <v-list dense>
    <h3 class="ml-3 goldman-font mt-2">Group List</h3>
    <hr />
    <v-list-item
      v-for="group in groups"
      :key="group.gpName"
      :to="{
        name: 'Chat',
        params: { id: group.gpName }
      }"
    >
      <v-list-item-content>
        <v-list-item-title class="goldman-font text-capitalize">
          {{ group.gpName }}
        </v-list-item-title>
      </v-list-item-content>
      <v-card-actions v-if="group.owner">
        <v-chip small class="roboto-font" color="primary">
          Admin
        </v-chip>
      </v-card-actions>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "GroupList",
  props: ["groups"]
};
</script>
