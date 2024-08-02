<template>
  <div>
    <label for="email1" class="block text-900 font-medium mb-2 text-left"
      >Title</label
    >
    <InputText size="large" id="email1" type="text" class="w-full mb-3" />
    <label for="password1" class="block text-900 font-medium mb-2 text-left"
      >Description</label
    >
    <InputText
      size="large"
      id="password1"
      type="password"
      class="w-full mb-3"
    />

    <div class="flex align-items-center justify-content-between mb-6">
      <div class="flex align-items-center">
        <Checkbox
          id="completed"
          :binary="true"
          v-model="checked"
          class="mr-2"
        ></Checkbox>
        <label for="completed">Completed </label>
      </div>
      <Button label="Add +" severiy="success" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
// import Card from "primevue/card";
// import InputGroup from "primevue/inputgroup";
// import InputGroupAddon from "primevue/inputgroupaddon";
// import InputText from "primevue/inputtext";
// import DatePicker from "primevue/datepicker";

export default defineComponent({
  name: "HelloWorld",
  setup() {
    const filllll = ref();
    const checked = ref();
    return { filllll, checked };
  },
  components: {
    // Card,
    // InputGroup,
    // InputGroupAddon,
    InputText,
    Button,
    Checkbox,
  },
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
