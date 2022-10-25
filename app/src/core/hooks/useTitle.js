import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | Immo Kyan`;
    }, [title]);
};

export default useTitle;
