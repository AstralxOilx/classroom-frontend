"use client"
import { Atom, Building2, CircleUserRound, CodeXml, Cpu, Crown, Earth, EarthLock, Handshake, Languages, Octagon, Omega, School, Settings, Share2, ShieldAlert, ShieldCheck, ShieldX, User } from 'lucide-react'
import React, { useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from 'next-auth/react';

interface Props {
    id: string;
    name: string;
    fteacher: string;
    lteacher: string;
    total: number;
    color: string;
    role: number;
    permission: number;
    onsetSetting: (value: string) => void;
}

interface CardClassTeacherProps extends Props {
    status: number;
    subject: number;
    userId: string;
    onShare: (value: string) => void;
    onClickClassRoom: (value: string) => void;
}

const CardClass = ({
    id,
    name,
    userId,
    fteacher,
    lteacher,
    total,
    status,
    subject,
    color,
    role,
    permission,
    onShare,
    onsetSetting,
    onClickClassRoom,
}: CardClassTeacherProps) => {

    const { data: session } = useSession();
    const [share, setShare] = useState<string | null>(null);
    const [setting, setSetting] = useState<string | null>(null);
    const [cradClassRoom, setCradClassRoom] = useState<string | null>(null);


    const handlesetShare = (value: string) => {
        setShare(value);
        onShare(value); // ส่งค่า string ไปยัง callback
    };

    const handlesetSetting = (value: string) => {
        setSetting(value);
        onsetSetting(value); // ส่งค่า string ไปยัง callback
    };

    const handlesetCrad = (value: string) => {
        setCradClassRoom(value);
        onClickClassRoom(value); // ส่งค่า string ไปยัง callback
    };

    return (
        <>
            <div className='w-80 relative select-none border rounded-md cursor-pointer bg-primary/5 hover:bg-primary/10 duration-300'>
                <div onClick={() => handlesetCrad(id ?? '')} className='flex items-center p-3 space-x-1  w-80 h-44'>
                    <div className={`w-24 h-24 ${colorMapping[color]} flex items-center justify-center rounded-md `}>
                        <p className='text-3xl text-gray-200'>{name.slice(0, 2).toUpperCase()}</p>
                    </div>
                    <div className='w-40 overflow-hidden space-y-1 text-gray-700 dark:text-gray-300'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex space-x-1 items-center">
                                        <School className='text-primary/80' size={23} />
                                        <p className='truncate'>{name}</p>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>ห้องเรียน {name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="text-gray-500 flex items-center space-x-1">
                                        <div className='text-green-700/80'><Crown size={20} /></div>
                                        <p className='truncate text-sm'>
                                            {'ผู้สอน'}{' '}
                                            {fteacher.charAt(0).toUpperCase() + fteacher.slice(1) + ' ' + lteacher.charAt(0).toUpperCase() + lteacher.slice(1)}
                                        </p>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        {'ผู้สอน'}{' '}
                                        {fteacher.charAt(0).toUpperCase() + fteacher.slice(1) + ' ' + lteacher.charAt(0).toUpperCase() + lteacher.slice(1)}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="text-gray-500 flex items-center space-x-1">
                                        <div><CodeXml size={20} /></div>
                                        <p className="truncate text-sm">
                                            {classRoleMapping[role]}
                                        </p>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        {'ผู้สอน'}{' '}
                                        {fteacher.charAt(0).toUpperCase() + fteacher.slice(1) + ' ' + lteacher.charAt(0).toUpperCase() + lteacher.slice(1)}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <div className='flex space-x-2'>
                            {statusMapping[status]}
                            {subjectMapping[subject]}
                        </div>
                    </div>
                </div>
                <div className='text-gray-600 dark:text-gray-400 z-10 w-full p-1 absolute bottom-0 flex justify-between items-center space-x-1'>
                    <div className='flex space-x-1'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className='flex p-1 text-sm' >
                                        <User size={20} />
                                        <span>{total}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>จำนวน สมาชิก {total}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className='flex space-x-1'>
                        <div className='flex justify-center items-center p-1'>
                            {permissionMapping[permission]}
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div onClick={() => handlesetSetting(id ?? "noSetting")} className='text-gray-300 p-1 rounded-md bg-primary/90 hover:bg-primary hover:text-gray-100'>
                                        <Settings />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>ตั้งค่า</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div onClick={() => handlesetShare(id ?? "noCode")} className='text-gray-300 p-1 rounded-md bg-primary/90 hover:bg-primary hover:text-gray-100 '>
                                        <Share2 />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>แชร์</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </>
    )
}




export { CardClass }

export const subjectMapping: Record<string, JSX.Element> = {
    1:
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="text-gray-500 flex items-center  space-x-1">
                        <Languages size={18} />
                        <p className='truncate text-sm'>Linguistics</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>หมวดหมู่วิชา Linguistics</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ,
    2:
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="text-gray-500 flex items-center  space-x-1">
                        <Omega size={18} />
                        <p className='truncate text-sm'>Mathematics And Science</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>หมวดหมู่วิชา Mathematics And Science</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ,
    3:
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="text-gray-500 flex items-center  space-x-1">
                        <Handshake size={18} />
                        <p className='truncate text-sm'>Social Sciences</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>หมวดหมู่วิชา Social Sciences</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ,
    4:
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="text-gray-500 flex items-center  space-x-1">
                        <Handshake size={18} />
                        <p className='truncate text-sm'>Arts And Design</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>หมวดหมู่วิชา Arts And Design</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ,
    5:
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="text-gray-500 flex items-center  space-x-1">
                        <Cpu size={18} />
                        <p className='truncate text-sm'>Occupational And Technology Studies</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>หมวดหมู่วิชา Occupational And Technology Studies</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ,
    6:
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="text-gray-500 flex items-center  space-x-1">
                        <Atom size={18} />
                        <p className='truncate text-sm'>Health And Physical Education</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>หมวดหมู่วิชา Health And Physical Education</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ,
    7:
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="text-gray-500 flex items-center  space-x-1">
                        <Building2 size={18} />
                        <p className='truncate text-sm'>Business And Economics</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>หมวดหมู่วิชา Business And Economics</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ,
    8:
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="text-gray-500 flex items-center  space-x-1">
                        <Octagon size={18} />
                        <p className='truncate text-sm'>Other</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>หมวดหมู่วิชา Other</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ,
}

export const statusMapping: Record<string, JSX.Element> = {

    1: <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="text-gray-500 flex items-center  space-x-1">
                    <EarthLock size={18} />
                    <p className='truncate text-sm'>Private</p>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>สถานะ Private</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    ,
    2:
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="text-gray-500 flex items-center  space-x-1">
                        <Earth size={18} />
                        <p className='truncate text-sm'>Publish</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>สถานะ Publish</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ,
};



export const permissionMapping: Record<string, JSX.Element> = {

    1: <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="text-gray-500 flex items-center">
                    <ShieldAlert className='text-yellow-700/80' size={24} />
                    <p className='truncate text-sm'>Pending</p>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>สถานะ Pending</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    ,
    2:
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="text-gray-500 flex items-center">
                        <ShieldCheck className='text-green-700/80' size={24} />
                        <p className='truncate text-sm'>Join</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>สถานะ Join</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ,
    3:
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="text-gray-500 flex items-center">
                        <ShieldX className='text-red-700/80' size={24} />
                        <p className='truncate text-sm'>Ban</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>สถานะ Ban</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ,
};


export const classRoleMapping: Record<string, string> = {

    1: 'คุณเป็นผู้สอน',
    2: 'คุณเป็นผู้ช่วยสอน',
    3: 'คุณเป็นนักเรียน',
    4: 'คุณเป็นหัวหน้าห้อง',
};

export const colorMapping: Record<string, string> = {
    gray: 'bg-gray-600',
    orange: 'bg-orange-600',
    amber: 'bg-amber-600',
    yellow: 'bg-yellow-600',
    lime: 'bg-lime-600',
    green: 'bg-green-600',
    emerald: 'bg-emerald-600',
    teal: 'bg-teal-600',
    cyan: 'bg-cyan-600',
    sky: 'bg-sky-600',
    blue: 'bg-blue-600',
    indigo: 'bg-indigo-600',
    violet: 'bg-violet-600',
    purple: 'bg-purple-600',
    fuchsia: 'bg-fuchsia-600',
    pink: 'bg-pink-600',
    rose: 'bg-rose-600',
    red: 'bg-red-600',
};
