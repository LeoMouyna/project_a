<template>
  <section>
    <v-row>
      <v-col cols="12" sm="6">
        <b-field label="Phone Number">
          <vue-phone-number-input
            v-model="user.phoneNumber"
            :preferred-countries="preferredCountries"
            @update="phoneNumberUpdated"
            :translations="translations"
          />
        </b-field>
        <b-field label="Profesional status" />
        <b-field>
          <b-select
            placeholder="Situation"
            icon="account-tie"
            v-model="user.situation"
            expanded
          >
            <option
              v-for="situation in situations"
              :key="situation"
              :value="situation"
              >{{ situation }}</option
            >
          </b-select>
        </b-field>

        <b-field
          label="Institution"
          label-position="on-border"
          custom-class="is-medium"
          v-if="needSituation"
        >
          <b-autocomplete
            v-model="institution"
            :data="filteredInstitutions"
            placeholder="e.g. INSA Lyon"
            :open-on-focus="true"
            field="name"
            @select="option => (user.institutionId = option.id)"
          >
            <template slot="footer">
              <a @click="addInstitution()">
                <span> Add new... </span>
              </a>
            </template>
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <b-field
          label="Domain"
          label-position="on-border"
          custom-class="is-medium"
        >
          <b-autocomplete
            v-model="domain"
            :data="filteredDomains"
            placeholder="e.g. Telecom"
            :open-on-focus="true"
            field="name"
            @select="option => (user.domainId = option.id)"
          >
            <template slot="footer">
              <a @click="addDomain()">
                <span> Add new... </span>
              </a>
            </template>
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>
        <b-field
          label="T-Shirt Size"
          label-position="on-border"
          custom-class="is-medium"
        >
          <b-select
            placeholder="T-Shirt Size"
            icon="tshirt-crew"
            expanded
            size="is-medium"
          >
            <option v-for="size in tshirt_sizes" :key="size" :value="size">{{
              size
            }}</option>
          </b-select>
        </b-field>
      </v-col>
      <v-col cols="12" sm="6">
        <b-field label="Friends">
          <b-input
            maxlength="200"
            type="textarea"
            v-model="user.friends"
          ></b-input>
        </b-field>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input/dist/vue-phone-number-input.common";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import DomainRequest from "../../services/http/domainService";
import InstitutionRequest from "../../services/http/institutionService";

const domainRequest = new DomainRequest();
const institutionRequest = new InstitutionRequest();

export default {
  components: {
    VuePhoneNumberInput
  },
  computed: {
    translations() {
      return {
        countrySelectorLabel: this.$t("Country code"),
        countrySelectorError: this.$t("Choose a country"),
        phoneNumberLabel: this.$t("Phone number"),
        example: this.$t("Example") + " :"
      };
    },
    filteredDomains() {
      return this.domains.filter(option => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.domain.toLowerCase()) >= 0
        );
      });
    },
    filteredInstitutions() {
      return this.institutions
        .filter(option => {
          return (
            option.name
              .toString()
              .toLowerCase()
              .indexOf(this.institution.toLowerCase()) >= 0
          );
        })
        .filter(option => {
          return (
            option.type
              .toString()
              .toLowerCase()
              .indexOf(this.user.situation.toLowerCase()) >= 0
          );
        });
    },
    needSituation() {
      return ["Student"].includes(this.user.situation);
    }
  },
  data() {
    return {
      preferredCountries: ["FR", "BE", "US", "BR"],
      phoneValid: false,
      domains: [],
      domain: "",
      institutions: [],
      institution: ""
    };
  },
  methods: {
    phoneNumberUpdated(e) {
      this.phoneValid = e.isValid;
    },
    addDomain() {
      domainRequest
        .post({ name: this.domain })
        .then(resp => this.domains.push(resp.data.domain));
    },
    addInstitution() {
      institutionRequest
        .post({ name: this.institution, type: this.user.situation })
        .then(resp => this.institutions.push(resp.data.institution));
    }
  },
  mounted() {
    domainRequest.fetch().then(resp => (this.domains = resp.data.domains));
    institutionRequest
      .fetch()
      .then(resp => (this.institutions = resp.data.institutions));
  },
  props: {
    user: Object,
    tshirt_sizes: {
      type: Array,
      default: () => ["XS", "S", "M", "L", "XL"]
    },
    situations: {
      type: Array,
      default: () => ["Student", "Other"]
    }
  }
};
</script>

<style></style>
