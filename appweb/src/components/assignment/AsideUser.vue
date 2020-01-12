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
      v-for="task in availableTasks"
      :key="task.id"
      :instance="task"
      :user="user"
      @assign="$emit('assign:task', $event)"
    />
  </section>
</template>

<script>
import TaskCard from "./TaskCard";
export default {
  components: {
    TaskCard
  },
  data() {
    return {
      timepicker: { incrementMinutes: 15 },
      datepicker: { range: true },
      dates: []
    };
  },
  props: {
    interval: Object,
    intervalAvailable: Boolean,
    availableTasks: { type: Array, default: () => [] },
    user: Object
  }
};
</script>
