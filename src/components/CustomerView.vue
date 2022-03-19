<template>
  <div class="about container">
    <div>
      <AlertMessage v-if="alert" :message="alert" />
      <h1 style="margin-bottom: 1em">Manage Customers</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{ customer.first_name }}</td>
            <td>{{ customer.last_name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.address }}</td>
            <td>{{ customer.city }}</td>
            <td>{{ customer.state }}</td>
            <td><button class="btn">view</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "../store";
import { customers, State } from "../store/modules/customer";
import { status } from "../store/types"
import { useRouter } from "vue-router";
import AlertMessage from "./AlertMessage.vue";
export default defineComponent({
  components: { AlertMessage },
  data() {
    return {
      alert: "",
    }
    
  },
  setup() {
    const store = useStore();
    const customerState = computed<State>(() => store.state.customers);
    const customers = computed<customers[]>(() => customerState.value.item)
    const loadingstates = ref({
      GetCustomers: computed<status>(() => customerState.value.customerRequestStatus.GetCustomers),
    });
    return { customers, loadingstates };
  },
  methods: {
    created: function (){
      if(this.$router.hasRoute.arguments.alert){
        this.alert = this.$router.hasRoute.arguments.alert
        console.log(this.alert);
      }
    }
  }
});
</script>
