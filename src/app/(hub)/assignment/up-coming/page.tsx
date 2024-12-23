"use client"
import { usePageContext } from "@/contexts/page-context";
import { useEffect } from "react";

const AssessmentPage = () => {
    const { setPageName } = usePageContext();
    useEffect(() => {
        setPageName("Assignment/Up coming");
    }, [setPageName]);
    return (
        <> 
        lorem2000
        </>
    );
};

export default AssessmentPage;
