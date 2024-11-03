import { useFocusEffect } from "@react-navigation/native";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import Post from "../models/post";

const useLayoutFocus = () => {
    const ref = useRef(0)
    useFocusEffect(
        useCallback(() => {
            ref.current++
            //refetch();
            console.log('focus' + ref.current)
        }, [])
    );
    return ref.current
};

export default useLayoutFocus;
