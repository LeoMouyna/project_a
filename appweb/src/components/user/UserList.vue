<template>
  <section>
    <div class="table-filter">
      <b-field grouped>
        <b-field>
          <b-input
            placeholder="Find a user"
            type="search"
            icon-pack="fas"
            icon="user"
            v-model="name"
            @input="applyFilter"
          >
          </b-input>
        </b-field>
        <b-field>
          <b-select
            placeholder="Team"
            icon="users"
            icon-pack="fas"
            v-model="team"
            @input="applyFilter"
          >
            <option v-for="team in teams" :key="team.name" :value="team.name">{{
              team.name
            }}</option>
          </b-select>
        </b-field>
        <b-button
          type="is-danger"
          icon-right="close"
          rounded
          @click="clearFilters"
          >Clear filters</b-button
        >
      </b-field>
    </div>
    <b-table
      :data="filteredUsers"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-position="paginationPosition"
      :selected.sync="user"
      @select="$emit('select', $event)"
    >
      <template slot-scope="props">
        <b-table-column field="firstname" label="First Name" sortable>
          {{ props.row.firstname }}
        </b-table-column>

        <b-table-column field="surname" label="Surname" sortable>
          {{ props.row.surname }}
        </b-table-column>

        <b-table-column field="lastname" label="Last Name" sortable>
          {{ props.row.lastname }}
        </b-table-column>

        <b-table-column field="teams" label="Teams">
          <b-taglist>
            <b-tag
              v-for="team in props.row.teams"
              :key="team"
              :type="`is-${team}`"
              >{{ team }}</b-tag
            >
          </b-taglist>
        </b-table-column>

        <b-table-column field="score" label="Charisma" sortable>
          {{ props.row.score }}
        </b-table-column>
        <b-table-column label="Assignment Rate">
          0 %
        </b-table-column>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
            </p>
            <p>Nothing here.</p>
          </div>
        </section>
      </template>
    </b-table>
  </section>
</template>

<script>
import { HTTP } from "../../services/httpService";
import { userMixin } from "../../mixins/userMixin";

export default {
  data() {
    return {
      users: [],
      teams: [],
      user: null,
      filteredUsers: [],
      isPaginated: true,
      paginationPosition: "bottom",
      currentPage: 1,
      perPage: 10,
      name: "",
      team: ""
    };
  },
  methods: {
    clearFilters() {
      this.name = "";
      this.team = "";
      this.filteredUsers = this.users;
    },
    applyFilter() {
      let list = this.users;
      if (this.name) {
        list = list.filter(user =>
          this.displayUserName(user)
            .toLowerCase()
            .includes(this.name.toLowerCase())
        );
      }
      if (this.team) {
        list = list.filter(user => user.teams.includes(this.team));
      }
      this.filteredUsers = list;
    }
  },
  mixins: [userMixin],
  mounted() {
    HTTP.get("users").then(response => {
      this.users = response.data;
      this.filteredUsers = this.users;
    });
    HTTP.get("teams").then(response => {
      this.teams = response.data;
    });
  }
};
</script>

<style>
.is-hard {
  background-color: #f77d2c !important;
}
.is-communication {
  background-color: #842cf7 !important;
  color: white;
}
.is-moth\' {
  background-color: #f72cba !important;
}

.tag * {
  color: white;
}
</style>
