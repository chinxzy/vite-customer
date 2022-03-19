export enum ActionTypes {
  FetchCustomers = "FETCH_ITEMS",
  AddCustomers = "ADD_CUSTOMERS",
}
export enum MutationTypes {
  SetCustomers = "SET_ITEMS",
  AddCustomers = "ADD_CUSTOMERS",
  CustomerLoading = "LOAD_CUSTOMER",
  CustomerError = "CUSTOMER_ERROR"
}
export enum status {
  loading = "LOADING",
  success = "SUCCESS",
  error = "ERROR",
  idle = "IDLE"

}
export interface CustomerStatus {
  Addcustomers : status;
  GetCustomers : status
}