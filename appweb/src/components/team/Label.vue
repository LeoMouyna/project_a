<template>
  <b-tag :style="{ backgroundColor: team.color, color: textColor }">{{
    team.name.toLowerCase()
  }}</b-tag>
</template>

<script>
import "../../mixins/stringMixin";
import color from "color";
export default {
  computed: {
    textColor() {
      if (this.team.color) {
        return color(this.team.color).isLight() ? "#000000" : "#ffffff";
      } else return "#ffffff";
    }
  },
  props: {
    team: Object
  }
};
</script>

<style></style>
