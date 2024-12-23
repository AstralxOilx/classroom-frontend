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
import { Slash, Tags, UserRoundCog} from "lucide-react";
import { usePathname } from "next/navigation";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <main className="relative">
            <div className="z-10 p-2 md:px-14 fixed top-22 w-[100%] bg-background/80 backdrop-filter backdrop-blur-lg">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard/class-group">
                                <div className={`${pathname === '/dashboard/class-group' ? 'text-primary font-bold' : 'text-gray-600'} flex justify-center items-center space-x-1 hover:text-primary`}>
                                    <Tags size={20} className="text-green-900" />
                                    <p>Group</p>
                                </div>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard/profile/account">
                                <div className={`${pathname === '/dashboard/profile/account' || pathname === '/dashboard/profile/password' ? 'text-primary font-bold' : 'text-gray-600'} flex justify-center items-center space-x-1 hover:text-primary`}>
                                    <UserRoundCog size={20} className="text-blue-900" />
                                    <p>Profile</p>
                                </div>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="pt-10 grid justify-items-center w-full p-2">
                {children}
            </div>
        </main>
    )
}
