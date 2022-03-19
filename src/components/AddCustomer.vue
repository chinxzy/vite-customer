<template>
  <div class="container">
    <h1 class="page-header">Add Customer</h1>
    <form @submit.prevent="AddCustomer">
      <div class="well">
        <h4>Customer Info</h4>
        <div class="form-group">
          <label>First Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="First Name"
            v-model="first_name"
          />
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Last Name"
            v-model="last_name"
          />
        </div>
      </div>
      <div class="well">
        <h4>Customer Contact</h4>
        <div class="form-group">
          <label>Email</label>
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input
            type="text"
            class="form-control"
            placeholder="Phone"
            v-model="phone"
          />
        </div>
      </div>

      <div class="well">
        <h4>Customer Location</h4>
        <div class="form-group">
          <label>Address</label>
          <input
            type="text"
            class="form-control"
            placeholder="Address"
            v-model="address"
          />
        </div>
        <div class="form-group">
          <label>City</label>
          <input
            type="text"
            class="form-control"
            placeholder="City"
            v-model="city"
          />
        </div>
        <div class="form-group">
          <label>State</label>
          <input
            type="text"
            class="form-control"
            placeholder="State"
            v-model="state"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { customers } from "../store/modules/customer";
import { useStore } from "../store";
import { useRouter } from "vue-router";
import { CustomerStatus, status } from "../store/types";
export default defineComponent({
  setup() {
    const store = useStore();
    const first_name = ref("");
    const last_name = ref("");
    const email = ref("");
    const phone = ref("");
    const address = ref("");
    const city = ref("");
    const state = ref("");
    const customerRequestStatus = computed<CustomerStatus>(
      () => store.state.customers.customerRequestStatus
    );
    const router = useRouter();

    const AddCustomer = async () => {
      if (
        first_name.value === "" ||
        last_name.value === "" ||
        email.value === "" ||
        phone.value === "" ||
        address.value === "" ||
        city.value === "" ||
        state.value === ""
      ) {
        alert("you must fill all fields");
        return;
      }

      const item: customers = {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        city: city.value,
        state: state.value,
      };
      first_name.value = "";
      last_name.value = "";
      email.value = "";
      phone.value = "";
      address.value = "";
      city.value = "";
      state.value = "";
      await store.dispatch("customers/AddCustomers", item);

      if (customerRequestStatus.value.Addcustomers === status.success)
        console.log(customerRequestStatus.value);
      router.push({ path: "/", query: {alert: "added succesfully"}});

    };

    return {
      AddCustomer,
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      state,
    };
  },
});
</script>
