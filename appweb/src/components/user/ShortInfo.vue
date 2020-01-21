<template>
  <v-list dense>
    <v-list-item two-line>
      <v-list-item-avatar>
        <v-img :src="pictureSrc" alt="profile_picture"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          {{ displayUserName(user) }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <v-icon>mdi-phone</v-icon>{{ user.id }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { userMixin } from "../../mixins/userMixin";
import userService from "../../services/userService";
export default {
  mixins: [userMixin],
  data() {
    return {
      pictureSrc: userService.profilePictureUrl(this.user)
    };
  },
  props: {
    user: Object
  }
};
</script>

<style></style>
