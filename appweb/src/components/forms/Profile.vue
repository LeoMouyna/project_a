<template>
  <section>
    <v-row>
      <v-col cols="12" sm="6">
        <v-avatar class="center" size="150">
          <img v-if="user.picture" :src="url" alt="User profile picture" />
          <img v-else src="@/assets/avatar-anonymous.png" />
        </v-avatar>

        <b-field class="center">
          <b-upload
            class="fill-width"
            v-model="user.picture"
            @input="generateUrl"
            accept="image/*"
          >
            <a class="button is-primary fill-width">
              <b-icon icon="upload"></b-icon>
              <span>Select your profile picture</span>
            </a>
          </b-upload>
        </b-field>
      </v-col>
      <v-col cols="12" sm="6">
        <b-field
          label="Firstname"
          label-position="on-border"
          custom-class="is-medium"
        >
          <b-input
            size="is-medium"
            placeholder="Firstname"
            v-model="user.firstname"
            required
          >
          </b-input>
        </b-field>
        <b-field
          label="Surname"
          label-position="on-border"
          custom-class="is-medium"
        >
          <b-input
            size="is-medium"
            placeholder="Surname"
            v-model="user.surname"
            required
          >
          </b-input>
        </b-field>
        <b-field
          label="Lastname"
          label-position="on-border"
          custom-class="is-medium"
        >
          <b-input
            size="is-medium"
            placeholder="Lastname"
            v-model="user.lastname"
            required
          >
          </b-input>
        </b-field>
        <b-field
          label="Age"
          label-position="on-border"
          custom-class="is-medium"
        >
          <b-input
            size="is-medium"
            v-model="user.age"
            type="number"
            placeholder="Age"
            min="15"
            max="100"
            required
          />
        </b-field>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      url: undefined
    };
  },
  props: {
    user: Object
  },
  methods: {
    print(m) {
      console.log(m);
    },
    generateUrl(file) {
      this.url = URL.createObjectURL(file);
    }
  }
};
</script>

<style>
.fill-width {
  width: 100%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
