"use client"
import { usePageContext } from "@/contexts/page-context";
import { useEffect } from "react";

const NotificationPage = () => {
    const { setPageName } = usePageContext();
    useEffect(() => {
        setPageName("Notification");
    }, [setPageName]);
    return (
        <></>
    );
};

export default NotificationPage;
