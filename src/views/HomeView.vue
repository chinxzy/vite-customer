<template>
<h1>{{ $route.params.id }}</h1>
  <customer-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import CustomerView from "../components/CustomerView.vue";
import { useStore } from "../store/index";

export default defineComponent({
  components: {
    CustomerView,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    console.log(route.params.id);
    store.dispatch("customers/getCustomers");
  },
})
</script>

