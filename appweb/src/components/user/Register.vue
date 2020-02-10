<template>
  <section>
    <b-steps>
      <b-step-item label="Account" icon="account-key" :clickable="true">
        <account :user="user" :passwordChecker="passwordChecker" />
      </b-step-item>
      <b-step-item label="Profile" icon="account" :clickable="true">
        <profile :user="user" />
      </b-step-item>
      <b-step-item label="More info" icon="account-plus" :clickable="true">
        <personal-info :user="user" />
      </b-step-item>
      <b-step-item label="Licence" icon="car" :clickable="true">
        <licence :user="user" />
      </b-step-item>
    </b-steps>
    <b-button type="is-primary" expanded size="is-medium">Register</b-button>
  </section>
</template>

<script>
import Account from "../forms/Account";
import Profile from "../forms/Profile";
import Licence from "../forms/Licence";
import PersonalInfo from "../forms/PersonalInfo";
export default {
  components: {
    Account,
    Profile,
    Licence,
    PersonalInfo
  },
  data() {
    return {
      user: {
        firstname: undefined,
        surname: undefined,
        lastname: undefined,
        email: undefined,
        password: undefined,
        picture: undefined,
        licence: undefined,
        hasLicence: false,
        phoneNumber: undefined
      },
      passwordChecker: undefined
    };
  }
};
</script>

<style>
.step-navigation {
  display: flex;
  justify-content: space-between;
}
</style>
