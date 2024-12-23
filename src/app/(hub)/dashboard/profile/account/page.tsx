"use client"
import { usePageContext } from "@/contexts/page-context";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { UserRoundPen } from "lucide-react";

const ProfilePage = () => {
    const { setPageName } = usePageContext();
    useEffect(() => {
        setPageName("Dashboard/Profile/Account");
    }, [setPageName]);
    return (
        <>
            <h1>Account</h1>
            <p className="text-gray-500 text-sm">Make changes to your account here. Click save when you're done.</p>
            <div className="">
                <div className="flex justify-start items-center space-x-1 text-gray-600">
                    <UserRoundPen size={20} />
                    <p>First name</p>
                </div>
                <Input className=" rounded-md bg-background" placeholder="First Name" />
            </div>
            <div className="">
                <div className="flex justify-start items-center space-x-1 text-gray-600">
                    <UserRoundPen size={20} />
                    <p>Last name</p>
                </div>
                <Input className=" rounded-md bg-background" placeholder="Last Name" />
            </div>
        </>
    );
};

export default ProfilePage;


