import { RefObject, useEffect } from "react";

export const useClickOutside = (
    ref: RefObject<HTMLElement>,
    callback: () => void
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current &&
                !ref.current.contains(event.target as HTMLElement)
            ) {
                callback();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref, callback]);
};
