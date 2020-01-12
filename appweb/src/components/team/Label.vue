<template>
  <b-tag :type="`is-${team.name.toKebabCase()}`">{{ team.name }}</b-tag>
</template>

<script>
import "../../mixins/stringMixin";
export default {
  props: {
    team: Object
  }
};
</script>

<style>
.is-hard {
  background-color: #f77d2c !important;
}
.is-communication {
  background-color: #842cf7 !important;
}
.is-moth {
  background-color: #f72cba !important;
}
.is-human-ressources {
  background-color: #f06292 !important;
}
.is-catering {
  background-color: #c0ca33 !important;
}
.is-soft {
  background-color: #ffa000 !important;
}

.tag * {
  color: white;
}
</style>
