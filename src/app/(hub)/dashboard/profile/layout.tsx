"use client"
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LockKeyhole, Slash, Tags, UserRoundCog } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <main className="relative">
            <div className="pt-10 grid justify-items-center w-full">
                <div className=" w-[22.5rem] md:w-[35rem] space-y-2 border border-primary/10 rounded-lg p-2 pb-6 md:px-9 bg-primary/5 ">
                    <div className="flex">
                        <Link href="/dashboard/profile/account">
                            <div className={`${pathname === '/dashboard/profile/account' ? 'font-bold bg-primary text-gray-200' : 'text-gray-600'} p-1 px-4 border border-primary/10 rounded-l-md flex justify-center items-center space-x-1 hover:text-gray-200 hover:bg-primary`}>
                                <UserRoundCog size={20} />
                                <p>Account</p>
                            </div>
                        </Link>
                        <Link href="/dashboard/profile/password">
                            <div className={`${pathname === '/dashboard/profile/password' ? 'font-bold bg-primary text-gray-200' : 'text-gray-600'} p-1 px-4 border border-primary/10 rounded-r-md flex justify-center items-center space-x-1 hover:text-gray-200 hover:bg-primary`}>
                                <LockKeyhole size={20} />
                                <p>Password</p>
                            </div>
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </main>
    )
}
