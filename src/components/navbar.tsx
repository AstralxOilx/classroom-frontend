"use client";
import React, { useEffect, useState } from 'react';
import { CodeXml, LogOut, Menu, Slash, UserCog } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { NavItems } from '@/lib/layout/navItem';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@radix-ui/react-tooltip';
import Link from 'next/link';

import { ModeToggle } from './ui/theme-mode-toggle';
import { usePageContext } from "@/contexts/page-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';


type Props = {}

export default function Navbar(props: Props) {
    const { data: session, status } = useSession();
    const navItems = NavItems();
    const { pageName } = usePageContext();
    const paths = Array.isArray(pageName) ? pageName : [pageName];
    const [profile, setProfile] = useState({
        role: '',
        fname: '',
        lname: '',
    });
    useEffect(() => {
        setProfile({
            role: '',
            fname: '',
            lname: '',
        })
    }, []);


    return (
        <section className='h-12 flex justify-between items-center p-2 bg-background border-b border-primary/20'>
            <div className='flex gap-1'>
                <div className='bg-accent rounded-md  w-10 h-10 text-center'>

                </div>
                <div className="flex justify-center items-center">
                    {
                        paths.map((path) => {
                            const pathSegments = path.split("/");
                            return (
                                <div key={path} className="flex flex-row items-center my-2">
                                    {pathSegments.map((segment: string, index: number) => (
                                        <div key={index} className="flex items-center">
                                            <p
                                                className={`${index === 0 ? 'text-[15px] dark:text-gray-300 text-gray-600' : 'text-[12px] dark:text-gray-400 text-gray-500'}`}
                                            >
                                                {segment}
                                            </p>
                                            {index < pathSegments.length - 1 && (
                                                <div className='flex items-center space-y-1'>
                                                    <Slash size={12} className='text-gray-400' />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className='ml-4 flex items-center gap-1'>
                <div
                    className="flex gap-2 items-center sm:hidden shadow-sm shadow-primary/10 duration-300"
                >
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="rounded-full">
                                <AvatarImage src=" " />
                                <AvatarFallback>{session?.user.fname.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='border p-2 bg-background'>
                            <DropdownMenuLabel>Account</DropdownMenuLabel>
                            <DropdownMenuItem disabled className='flex space-y-1 text-gray-400'><CodeXml />{session?.user.roleName.charAt(0).toUpperCase()+''+session?.user.roleName.slice(1)}</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <Link href={"/dashboard/profile/account"}>
                                <DropdownMenuItem><UserCog />{session?.user.fname.charAt(0).toLocaleUpperCase() +''+ session?.user.fname.slice(1) + ' ' + session?.user.lname.charAt(0).toLocaleUpperCase() +''+ session?.user.lname.slice(1)}</DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className='flex space-y-1'  onClick={()=>signOut({ callbackUrl: "/" })}  ><LogOut className='text-red-600' /><p className='text-red-600'>Sign out</p></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Sheet>
                    <SheetTrigger className="w-9 h-9 flex justify-center items-center sm:hidden border border-primary/10 p-1 bg-secondary rounded-md text-secondary-foreground/60">
                        <Menu />
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetHeader>
                            <SheetTitle></SheetTitle>
                            <SheetDescription></SheetDescription>
                            <div className="pt-4 overflow-y-auto h-fit w-full flex flex-col gap-1">
                                {navItems.map((item, idx) => {
                                    if (item.position === 'hub') {
                                        return (
                                            <Link
                                                key={idx}
                                                href={item.href}
                                                className={`h-full relative flex items-center whitespace-nowrap rounded-md 
                                                        ${item.active
                                                        ? 'font-base text-sm bg-primary text-gray-200 border border-primary/10 shadow-sm shadow-primary/5'
                                                        : 'hover:bg-primary hover:text-gray-200 text-neutral-500 border border-primary/10 bg-primary/5 shadow-sm shadow-primary/5'
                                                    }`}
                                            >
                                                <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                                                    {item.icon}
                                                    <span>{item.name}</span>
                                                </div>
                                            </Link>
                                        );
                                    }
                                })}
                                <ModeToggle />
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </section>
    )
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
                    className={`h-10 w-[180px] relative flex items-center whitespace-nowrap rounded-lg shadow-lg shadow-primary/20
                        ${active
                            ? 'font-base text-sm bg-primary text-gray-200 border border-primary/10 shadow-xl shadow-primary/50'
                            : 'hover:bg-primary hover:text-gray-200 text-neutral-500 border border-primary/10 bg-primary/5 shadow-xl shadow-primary/50'
                        }`}
                >
                    <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-300">
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
                                className={`h-full w-full relative flex items-center whitespace-nowrap rounded-lg shadow-lg shadow-primary/20
                                    ${active
                                        ? 'font-base text-sm bg-primary text-gray-100 dark:text-white border border-primary/10'
                                        : 'hover:bg-primary/90 hover:text-gray-200 text-neutral-500 border border-primary/10 bg-primary/5 '
                                    }`}
                            >
                                <div className="relative font-base text-sm p-2 flex flex-row items-center space-x-2 rounded-md duration-300">
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