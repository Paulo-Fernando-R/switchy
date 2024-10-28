import { useFocusEffect } from "@react-navigation/native";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import Post from "../models/post";

const useLayoutFocus = (refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<Post[], Error>>) => {
    useFocusEffect(
        useCallback(() => {
            refetch({});
            console.log('focus')
        }, [])
    );
};

export default useLayoutFocus;
