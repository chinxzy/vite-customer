import axios from "axios";
import { apiData } from "../../services/axiosService";
import { Module, Commit } from "vuex";
import { State as Rootstate } from "../index";
import { CustomerStatus, MutationTypes, status } from "../types";
import { useRouter } from "vue-router";

export interface customers {
  id?: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
}

export interface State {
  item: customers[];
  customerRequestStatus: CustomerStatus;
  customerRequestError : string
}


const customers: Module<State, Rootstate> = {
  namespaced: true,

  state: () => ({
    item: [],
    customerRequestStatus : {
      GetCustomers : status.idle,
      Addcustomers : status.idle
    },
    customerRequestError : ""
  }),

  mutations: {
    [MutationTypes.SetCustomers](state: State, item: customers[]) {
      state.customerRequestStatus.GetCustomers = status.success
      state.item = item;
    },
    [MutationTypes.CustomerLoading](state: State): void {
      state.customerRequestStatus.GetCustomers = status.loading
    },
    [MutationTypes.CustomerError](state: State, error: string): void {
      state.customerRequestError = error
      state.customerRequestStatus.GetCustomers = status.error
    },
    [MutationTypes.AddCustomers](state: State, item: customers) {
      state.customerRequestStatus.Addcustomers = status.success
      state.item;
    },
  },

  actions: {
    async getCustomers({ commit }: { commit: Commit }) {
      try {
        MutationTypes.CustomerLoading;
        const { data } = await axios.get("http://slimapp/api/customers");
        commit(MutationTypes.SetCustomers, data);
      } catch (e) {
       commit( MutationTypes.CustomerError, "error");
        console.log("error: ", e);
      }
    },
    async AddCustomers({ commit }: { commit: Commit }, payload: customers[]) {
      try {
        MutationTypes.CustomerLoading;
        const { data } = await axios.post(
          "http://slimapp/api/customer/add",
          payload
        );
        //success
        commit(MutationTypes.AddCustomers, data);
      } catch (e) {
        commit( MutationTypes.CustomerError, "error");
        console.log("error: ", e);
        //error
      }
    },
  },
};

export default customers;
