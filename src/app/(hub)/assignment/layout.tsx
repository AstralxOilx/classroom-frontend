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
import { ClipboardCheck, ClipboardList, ClipboardX, Slash } from "lucide-react";
import { usePathname } from "next/navigation";
export default function AssignmentLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <main className="relative">
            <div className="p-2 md:px-14 fixed top-22 w-[100%]  bg-background/80 backdrop-filter backdrop-blur-lg">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/assignment/up-coming">
                                <div className={`${pathname === '/assignment/up-coming' ? 'text-primary font-bold' : 'text-gray-600'} flex justify-center items-center space-x-1 hover:text-primary`}>
                                    <ClipboardList size={20} className="text-blue-900"/>
                                    <p>Up coming</p>
                                </div>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/assignment/completed">
                                <div className={`${pathname === '/assignment/completed' ? 'text-primary font-bold' : 'text-gray-600'} flex justify-center items-center space-x-1 hover:text-primary`}>
                                    <ClipboardCheck size={20} className="text-green-900"/>
                                    <p>Completed</p>
                                </div> </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/assignment/past-due">
                                <div className={`${pathname === '/assignment/past-due' ? 'text-primary font-bold' : 'text-gray-600'} flex justify-center items-center space-x-1 hover:text-primary`}>
                                    <ClipboardX size={20}  className="text-rose-900"/>
                                    <p>Past due</p>
                                </div> </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="pt-8">
                {children}
            </div>
        </main>
    )
}
