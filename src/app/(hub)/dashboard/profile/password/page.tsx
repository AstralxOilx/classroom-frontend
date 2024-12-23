"use client"
import { usePageContext } from "@/contexts/page-context";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { KeyRound } from "lucide-react";

const ProfilePage = () => {
    const { setPageName } = usePageContext();
    useEffect(() => {
        setPageName("Dashboard/Profile/Password");
    }, [setPageName]);
    return (
        <>
            <h1>Password</h1>
            <p className="text-gray-500 text-sm">Change your password here. After saving, you'll be logged out.</p>
            <div className="">
                <div className="flex justify-start items-center space-x-1 text-gray-600">
                    <KeyRound  size={20} />
                    <p>Current password</p>
                </div>
                <Input className=" rounded-md bg-background" placeholder="Current password" />
            </div>
            <div className="">
                <div className="flex justify-start items-center space-x-1 text-gray-600">
                    <KeyRound size={20} />
                    <p>New password</p>
                </div>
                <Input className=" rounded-md bg-background" placeholder="New password" />
            </div>
            <div className="">
                <div className="flex justify-start items-center space-x-1 text-gray-600">
                    <KeyRound size={20} />
                    <p>Confirm password</p>
                </div>
                <Input className=" rounded-md bg-background" placeholder="Confirm password" />
            </div>
        </>
    );
};

export default ProfilePage;


