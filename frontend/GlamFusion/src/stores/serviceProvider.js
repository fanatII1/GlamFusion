import { defineStore } from "pinia";

//all information about the service provider e.g the specific provider that a user wants to book
export const useServiceProviderStore = defineStore('serviceProvider', {
    state: () => ({
        StoreName: null,
        StoreLocation: null,
        StoreImage: null,
        StoreMembers: null,
        StoreServices: []
    }),
    actions:{
        setStoreInfo(storeInfo){
            // console.log('ss', storeInfo.StoreMembers)
            this.StoreName = storeInfo.StoreName,
            this.StoreLocation = storeInfo.StoreLocation,
            this.StoreImage = storeInfo.StoreImage,
            this.StoreMembers = storeInfo.StoreMembers,
            this.StoreServices = storeInfo.StoreServices
        }
    }
})