export type ListContextContent<T> = {
    values: T[] | null;
    setValues: (list: T[] | null) => void;
    updateOne: (post: T) => void;
};
