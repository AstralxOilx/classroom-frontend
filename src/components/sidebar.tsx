"use client";
import React, { Fragment, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, CodeXml, LogOut, UserCog } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from 'next/link';
import { NavItems } from "@/lib/layout/navItem";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from './ui/theme-mode-toggle';
import { signOut, useSession } from 'next-auth/react';


type Props = {}

export default function Sidebar(props: Props) {
    const { data: session, status } = useSession();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [profile, setProfile] = useState({
        role: '',
        fname: '',
        lname: '',
    });

    const navItems = NavItems();
    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    }

    useEffect(() => {
        setProfile({
            role: '',
            fname: '',
            lname: '',
        })
    }, []);
    return (
        <div className={cn(
            isSidebarExpanded ? 'w-[200px]' : 'w-[52px]',
            ' transition-all duration-300 ease-in-out transform hidden sm:flex h-fill z-50 bg-background border-r border-primary/20',
        )}>

            <aside className="flex h-full flex-col w-full break-words px-1 columns-1">
                <div className="mt-2 relative pb-2 w-full">
                    <div className="flex flex-col space-y-1 w-full">
                        {navItems.map((item, idx) => {
                            if (item.position === 'hub') {
                                return (
                                    <Fragment key={idx}>
                                        <div className="overflow-x-hidden">
                                            <SideNavItem
                                                label={item.name}
                                                icon={item.icon}
                                                path={item.href}
                                                active={item.active}
                                                isSidebarExpanded={isSidebarExpanded}
                                            />
                                        </div>
                                    </Fragment>
                                );
                            }
                        })}
                        <ModeToggle />
                    </div>
                </div>
                <div className="sticky grid gap-2 bottom-0 mt-auto whitespace-nowrap mb-4 transition duration-200">
                    {isSidebarExpanded ? (
                        <div
                            className="flex gap-2 items-center text-secondary-foreground shadow-sm shadow-primary/10 duration-300"
                        >
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer" >
                                    <Avatar className="rounded-xl">
                                        <AvatarImage src=" " />
                                        <AvatarFallback>{session?.user.fname.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-neutral-500 hover:text-secondary-foreground">{session?.user.fname.charAt(0).toLocaleUpperCase() +''+ session?.user.fname.slice(1) + ' ' + session?.user.lname.charAt(0).toLocaleUpperCase() +''+ session?.user.lname.slice(1)}</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuItem disabled ><CodeXml />{session?.user.roleName.charAt(0).toUpperCase()+''+session?.user.roleName.slice(1)}</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <Link href={"/dashboard/profile/account"}>
                                        <DropdownMenuItem><UserCog />{session?.user.fname.charAt(0).toLocaleUpperCase() +''+ session?.user.fname.slice(1) + ' ' + session?.user.lname.charAt(0).toLocaleUpperCase() +''+ session?.user.lname.slice(1)}</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} ><LogOut className='text-red-600' /><p className='text-red-600'>Sign out</p></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div
                            className="flex gap-2 items-center shadow-sm shadow-primary/10 duration-300"
                        >
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar className="rounded-xl">
                                        <AvatarImage src=" " />
                                        <AvatarFallback>{session?.user.fname.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                                    <DropdownMenuItem disabled ><CodeXml />{session?.user.roleName.charAt(0).toUpperCase()+''+session?.user.roleName.slice(1)}</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <Link href={"/dashboard/profile/account"}>
                                        <DropdownMenuItem><UserCog />{session?.user.fname.charAt(0).toLocaleUpperCase() +''+ session?.user.fname.slice(1) + ' ' + session?.user.lname.charAt(0).toLocaleUpperCase() +''+ session?.user.lname.slice(1)}</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} ><LogOut className='text-red-600' /><p className='text-red-600'>Sign out</p></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </div>
            </aside>
            <div className="relative flex justify-end items-center h-full w-full">
                <div
                    className="absolute top-2 right-[-32px] flex h-7 w-8 items-center justify-center rounded-r-lg transition-shadow ease-in-out backdrop-blur-xl bg-primary/40 text-gray-200 hover:bg-primary/90 duration-300"
                    onClick={toggleSidebar}
                >
                    {isSidebarExpanded
                        ? (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <ChevronLeft />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Close</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                        )
                        : (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <ChevronRight />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Open</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export const SideNavItem: React.FC<{
    label: string;
    icon: any;
    path: string;
    active: boolean;
    isSidebarExpanded: boolean;
}> = ({ label, icon, path, active, isSidebarExpanded }) => {
    return (
        <>
            {isSidebarExpanded ? (
                <Link
                    href={path}
                    className={`h-full w-[180px] relative flex items-center whitespace-nowrap rounded-lg 
                        ${active
                            ? 'font-base text-sm bg-primary text-gray-300 border border-primary/20'
                            : 'hover:bg-primary hover:text-gray-200 text-neutral-500 border border-primary/20'
                        }`}
                >
                    <div className="relative font-base text-sm py-2 px-2 flex flex-row items-center space-x-2 duration-300">
                        {icon}
                        <span>{label}</span>
                    </div>
                </Link>
            ) : (
                <TooltipProvider delayDuration={70}>
                    <Tooltip>
                        <TooltipTrigger>
                            <Link
                                href={path}
                                className={`h-full w-full relative flex items-center whitespace-nowrap rounded-xl
                                    ${active
                                        ? 'font-base text-sm bg-primary text-gray-300 border border-primary/20 '
                                        : 'hover:bg-primary hover:text-gray-200 text-neutral-500 border border-primary/20'
                                    }`}
                            >
                                <div className="relative font-base text-sm p-2 flex flex-row items-center space-x-2 duration-300">
                                    {icon}
                                </div>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent
                            side="left"
                            className="px-3 py-1.5 text-xs"
                            sideOffset={10}
                        >
                            <span>{label}</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </>
    );
};