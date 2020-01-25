<template>
  <section class="calendar-assignment">
    <h2>Planning for {{ name }}</h2>
    <b-field grouped>
      <b-field label="From">
        <b-datepicker
          placeholder="Select a date"
          icon="calendar-today"
          v-model="from"
        />
      </b-field>
      <b-field label="To">
        <b-datepicker
          placeholder="Select a date"
          :min-date="from"
          icon="calendar-today"
          v-model="to"
          @input="endOfDayDate($event)"
        />
      </b-field>
      <b-field label="# of days">
        <b-numberinput
          controls-position="compact"
          controls-rounded
          :min="0"
          :max="maxDays"
          v-model="days"
        />
      </b-field>
      <b-field label="Zoom">
        <b-field grouped>
          <b-button icon-right="plus" @click="hourHeight = hourHeight * 2" />
          <b-button
            icon-right="minus"
            @click="hourHeight = Math.max(hourHeight / 2, 25)"
            :disabled="hourHeight <= 25"
          />
        </b-field>
      </b-field>
    </b-field>
    <v-row>
      <v-col sm="12" lg="9" class="mb-4 controls">
        <v-sheet height="690">
          <v-calendar
            ref="calendar"
            :start="formatDate(from, false)"
            :end="formatDate(to, false)"
            :events="calendarEvents"
            :maxDays="days"
            :short-intervals="false"
            :event-color="getEventColor"
            color="primary"
            type="custom-daily"
            :interval-height="hourHeight"
            :interval-style="intervalStyle"
            @click:time="setClickedInterval"
            @click:event="showEvent"
          >
            <template v-slot:interval="{ hour, date, past }">
              <div
                v-if="!isInactiveInterval({ hour, date, past })"
                draggable="true"
                @dragstart="setInterval({ date, hour, past, field: 'start' })"
                @dragover="setInterval({ date, hour, past, field: 'end' })"
                class="hour-interval"
              ></div>
            </template>
          </v-calendar>
          <v-menu
            v-model="taskOpened"
            :close-on-content-click="false"
            :activator="taskActivator"
            offset-x
            :max-width="400"
          >
            <event-details
              :event="selectedTask"
              @detail-close="taskOpened = false"
              @detail-unassign="sendUnassign"
          /></v-menu>
        </v-sheet>
      </v-col>
      <v-col sm="12" lg="3" class="mb-4 controls">
        <aside-user
          v-if="type == 'user' && interval.start && interval.end"
          :interval="interval"
          :interval-available="checkIntervalAvailable"
          :available-tasks="availableTasks"
          :user="object"
          @assign:rest="setToRest"
          @assign:task="sendAssignment"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import "../../mixins/dateMixin";
import AsideUser from "./AsideUser";
import EventDetails from "../event/Details";
import { eventMixin } from "../../mixins/eventMixin";
import { assignMixin } from "../../mixins/assignMixin";
import { HTTP } from "../../services/httpService";
export default {
  mixins: [eventMixin, assignMixin],
  components: {
    AsideUser,
    EventDetails
  },
  data() {
    return {
      from: new Date(),
      maxDays: 15,
      days: 5,
      to: null,
      interval: {
        start: undefined,
        end: undefined
      },
      hourHeight: 25,
      taskInstances: [],
      taskOpened: false,
      taskActivator: undefined,
      selectedTask: {}
    };
  },
  computed: {
    calendarEvents() {
      if (this.interval.start && this.interval.end) {
        const fakeTask = {
          name: "Time slot",
          description: "HR time slot selected",
          supervisor: this.object
        };
        const event = [
          this.generateEvent(
            this.interval.start,
            this.interval.end,
            "blue lighten-4",
            fakeTask
          )
        ];
        return this.events.concat(event);
      } else return this.events;
    },
    checkIntervalAvailable() {
      const filters = this.events
        .map(event => {
          return { start: new Date(event.start), end: new Date(event.end) };
        })
        .filter(event => {
          return (
            event.end > this.interval.start && event.start < this.interval.end
          );
        });
      return filters.length == 0;
    },
    availableTasks() {
      // taskInstances during the time slot, with at least one requiredUser not full matching with user teams, where the selected user is not assigned yet
      const start = this.interval.start;
      const end = this.interval.end;
      const userId = this.object.id;
      const userTeamIds = this.object.teams.map(team => team.id);
      return this.taskInstances.filter(
        instance =>
          new Date(instance.start) >= start &&
          new Date(instance.end) <= end &&
          this.userNeeded(instance, userTeamIds, userId) &&
          !this.assignedUsersId(instance).includes(userId)
      );
    },
    userUnavailabilities() {
      if (this.type == "user" && "availabilities" in this.object) {
        let period = { start: this.from, end: this.to };
        const availabilities = this.object.availabilities
          .concat(this.events) // Get user availabilities and tasks he is assigned to.
          .sort(this.compareDateInterval)
          .map(av => {
            // Convert element to timeslots with only start and end fields as Dates.
            return {
              start: new Date(av.start),
              end: new Date(av.end)
            };
          })
          .filter((
            timeslot // Get only timeslot inside the range defined by from and to
          ) => this.isCovering(timeslot, period));

        let unavailabilities = availabilities.reduce(
          (unavailabilities, currentTimeslot) => {
            // Generate the unavailabilities according to previously defined timeslots
            // We are reducing the range of period incrementally and
            // try to split it till we don't have other timeslot available
            const split = this.splitInterval(period, currentTimeslot);
            // That means that the timeslot has a limit (start or end) equal to one of the period,
            // period is set to the remaining uncomputed period
            if (split.length == 1) {
              period = split[0];
              return unavailabilities;
            } // That means the split go smoothly with a timeslot inside the period,
            // period is set to the remaining uncomputed period and we generate an unavailability slot
            else if (split.length == 2) {
              period = split[1];
              unavailabilities.push(split[0]);
              return unavailabilities;
            } // Default behaviour: do nothing with the accumulator and the period variable
            else return unavailabilities;
          },
          []
        );
        // Add the remaining period as an unavailable timeslot
        unavailabilities.push(period);
        unavailabilities = unavailabilities.filter(
          interval => interval.start < interval.end
        );
        return unavailabilities;
      } else return [];
    }
  },
  methods: {
    isInactiveInterval(interval) {
      const period = {
        start: this.generateDate(interval.date, interval.hour),
        end: this.generateDate(interval.date, interval.hour + 1)
      };
      let inactive = interval.past;
      if (this.userUnavailabilities.length > 0) {
        inactive = this.userUnavailabilities.find(
          unavailability =>
            this.isCovering(period, unavailability) | interval.past
        );
        inactive = inactive ? true : false;
      }
      return inactive;
    },
    intervalStyle(interval) {
      return {
        backgroundColor: this.isInactiveInterval(interval)
          ? "rgba(0,0,0,0.05)"
          : undefined
      };
    },
    setClickedInterval({ date, hour, past }) {
      if (!this.isInactiveInterval({ date, hour, past })) {
        this.setInterval({ date, hour, field: "start" });
        this.setInterval({ date, hour: hour + 1, field: "end" });
      }
    },
    setInterval({ date, hour, field }) {
      const value = this.generateDate(date, hour);
      this.$set(this.interval, field, value);
    },
    setToRest(interval) {
      //TODO: Send updates to back-end
      this.events.push(
        this.generateEvent(
          interval.start,
          interval.end,
          "red accent-4",
          "Rest time",
          "Rest for some time"
        )
      );
    },
    sendAssignment({ user, task, as }) {
      const ret = this.assign(user, task, as);
      console.log(ret);
    },
    sendUnassign(task) {
      const ret = this.unassign(this.object, task);
      this.taskOpened = false;
      this.$emit("calendar-click:unassign", ret);
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedTask = event;
        this.taskActivator = nativeEvent.target;
        setTimeout(() => (this.taskOpened = true), 3);
      };

      if (this.taskOpened) {
        this.taskOpened = false;
        setTimeout(open, 3);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    log(m) {
      console.log(m);
    },
    checkInterval() {
      if (this.isCovering(this.interval, this.userUnavailabilities)) {
        this.interval.start = undefined;
        this.interval.end = undefined;
        this.console.error(
          "You can't set you timeslot over an unavailable one"
        );
      }
      if (this.interval.start > this.interval.end) {
        this.revertInterval(this.interval, this.interval);
      }
    },
    revertInterval(obj, { start, end }) {
      this.$set(obj, "start", end);
      this.$set(obj, "end", start);
    },
    isAvailable({ user, date, hour }) {
      const interval = {
        start: this.generateDate(date, hour),
        end: this.generateDate(date, hour + 1)
      };
      const avaiability = this.getAvailabilityFromInterval(
        user.avaiabilities,
        interval
      );
      return avaiability ? true : false;
    }
  },
  mounted() {
    this.from.setHours(0, 0, 0, 0);
    this.to = this.from.addDays(this.days);
    this.to.setHours(23, 59, 0, 0);
    HTTP.get(`taskInstances`).then(resp => {
      this.taskInstances = resp.data;
    });
  },
  props: {
    name: String,
    object: Object,
    type: { type: String, default: "user" },
    events: { type: Array, default: () => [] }
  }
};
</script>

<style>
.dense {
  padding-top: 0;
  padding-bottom: 0;
}
.hour-interval {
  width: 100%;
  height: 100%;
}
.v-event-timed strong {
  color: white;
}
.pl-1 strong {
  overflow: hidden;
  text-overflow: ellipsis;
}
.event-card-content {
  max-height: 150px;
  overflow: scroll;
}
</style>
