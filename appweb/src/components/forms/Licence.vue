<template>
  <section>
    <v-row>
      <v-col cols="12" sm="6">
        <b-field>
          <b-checkbox v-model="user.hasLicence">
            Driving licence ?
          </b-checkbox>
        </b-field>
        <b-field
          label="Delivery date"
          custom-class="is-medium"
          label-position="on-border"
          v-show="user.hasLicence"
        >
          <b-datepicker
            v-model="user.licenceDelivery"
            icon="calendar-today"
            custom-class="is-medium"
            placeholder="Select delivery date"
          >
          </b-datepicker>
        </b-field>
      </v-col>
      <v-col cols="12" sm="6">
        <div v-show="user.hasLicence">
          <b-upload
            class="fill-width"
            v-model="user.licence"
            @input="generateUrl"
            accept="application/pdf, image/*"
          >
            <a class="button is-primary fill-width">
              <b-icon icon="paperclip"></b-icon>
              <span>Select your licence</span>
            </a>
          </b-upload>
          <vue-pdf-viewer :url="url" v-if="user.licence" />
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import VuePDFViewer from "vue-instant-pdf-viewer";
export default {
  components: {
    "vue-pdf-viewer": VuePDFViewer
  },
  data() {
    return {
      url: undefined
    };
  },
  props: {
    user: Object
  },
  methods: {
    generateUrl(file) {
      this.url = URL.createObjectURL(file);
    }
  }
};
</script>

<style></style>
