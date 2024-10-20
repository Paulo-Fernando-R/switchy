import StorageTypeEnum from "../../enums/storageTypeEnum";

export default interface IStorageService<T> {
    key: StorageTypeEnum;

    setItem(value: T): void;
    getItem(): T | null;
    removeItem(): Promise<void>;
}
