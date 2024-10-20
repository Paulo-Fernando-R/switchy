import * as SecureStore from "expo-secure-store";
import StorageTypeEnum from "../../enums/storageTypeEnum";
import IStorageService from "./IstorageService";
export default class StorageService<T> implements IStorageService<T> {
    key: StorageTypeEnum;
    constructor(key: StorageTypeEnum) {
        this.key = key;
    }

    setItem(value: T) {
        SecureStore.setItem(this.key, JSON.stringify(value));
    }

    getItem() {
        const value = SecureStore.getItem(this.key);
        if (value) return JSON.parse(value) as T;

        return null;
    }

    async removeItem() {
        await SecureStore.deleteItemAsync(this.key);
    }
}
