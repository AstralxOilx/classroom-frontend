"use client"
import { usePageContext } from "@/contexts/page-context";
import { useEffect } from "react";

const AssessmentPage = () => {
    const { setPageName } = usePageContext();
    useEffect(() => {
        setPageName("Assignment/Past due");
    }, [setPageName]);
    return (
        <>
        </>
    );
};

export default AssessmentPage;
