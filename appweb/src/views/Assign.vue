<template>
  <section>
    <v-container fluid>
      <v-card outlined>
        <v-card-title>Welcome to Affect</v-card-title>
      </v-card>
    </v-container>
    <v-container>
      <user />
    </v-container>
  </section>
</template>

<script>
import User from "../components/assignment/User";
export default {
  name: "Affect",
  components: { User }
};
</script>
