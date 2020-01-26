<template>
  <section>
    <h3>Time slot selection</h3>
    <b-field label="From">
      <b-datetimepicker
        placeholder="Click to select..."
        v-model="interval.start"
        icon="calendar-today"
        :timepicker="timepicker"
      >
      </b-datetimepicker>
    </b-field>
    <b-field label="To">
      <b-datetimepicker
        placeholder="Click to select..."
        v-model="interval.end"
        icon="calendar-today"
        :min-date="interval.start"
        :timepicker="timepicker"
      >
      </b-datetimepicker>
    </b-field>
    <b-button
      type="is-warning"
      @click="$emit('assign:rest', interval)"
      :disabled="!intervalAvailable"
      >Rest</b-button
    >
    <!-- TODO: A time slot picker component -->
    <h3 v-if="availableTasks.length > 0">Available tasks</h3>
    <task-card
      v-for="task in sortedAvailableTasks"
      :key="task.id"
      :instance="task"
      :user="user"
      @assign="$emit('assign:task', $event)"
    />
  </section>
</template>

<script>
import TaskCard from "./TaskCard";
import taskInstanceService from "../../services/taskInstanceService";
import { dateMixin } from "../../mixins/dateMixin";
export default {
  components: {
    TaskCard
  },
  computed: {
    sortedAvailableTasks() {
      let sortedTasks = Object.assign({}, this.availableTasks);
      sortedTasks
        .sort((task1, task2) => {
          const date1 = new Date(task1.start);
          const date2 = new Date(task2.start);
          return date1 - date2;
        })
        .sort(this.compareDateIntervalDuration)
        .sort(this.compareTasksConfidenceLevel)
        .sort(this.compareTasksPriority);
      return sortedTasks;
    }
  },
  data() {
    return {
      timepicker: { incrementMinutes: 15 },
      datepicker: { range: true },
      dates: []
    };
  },
  methods: {
    compareTasksConfidenceLevel(taskA, taskB) {
      // third, sort on highest team confidence level in required matching with teams that the user is member of
      const bestConfidenceLevelA = taskInstanceService.getMoreSuitableTeamFieldItem(
        taskA,
        "confidenceLevel",
        this.user,
        Math.max
      );
      const bestConfidenceLevelB = taskInstanceService.getMoreSuitableTeamFieldItem(
        taskB,
        "confidenceLevel",
        this.user,
        Math.max
      );
      return bestConfidenceLevelA - bestConfidenceLevelB;
    },
    compareTasksPriority(taskA, taskB) {
      // then sort on lowest team priority in requird matching with teams that th user is member of
      const bestPriorityA = taskInstanceService.getMoreSuitableTeamFieldItem(
        taskA,
        "priority",
        this.user,
        Math.min
      );
      const bestPriorityB = taskInstanceService.getMoreSuitableTeamFieldItem(
        taskB,
        "priority",
        this.user,
        Math.min
      );
      return bestPriorityB - bestPriorityA;
    }
  },
  mixins: [dateMixin],
  props: {
    interval: Object,
    intervalAvailable: Boolean,
    availableTasks: { type: Array, default: () => [] },
    user: Object
  }
};
</script>
