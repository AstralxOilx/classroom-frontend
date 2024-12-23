"use client"
import { usePageContext } from "@/contexts/page-context";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { CirclePlus, Code, Frame, Layers3, Loader, Palette, School, Search } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import { resourceProps } from "@/types/resource";
import { resource } from "@/app/api/resource";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Backend_URL } from "@/lib/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CardClass } from "@/components/ui/card-class";
import { classroomProps } from "@/types/class";
import { classroom } from "@/app/api/class";
import { useRouter } from "next/navigation";

type Checked = DropdownMenuCheckboxItemProps["checked"];
const GroupPage = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { setPageName } = usePageContext();
    const [disableJoin, setdisableJoin] = useState(true);
    const [disableCreate, setdisableCreate] = useState(true);
    const [isJoin, setIsJoin] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [classData, setClassData] = useState({
        name: "",
        description: "",
        statusId: "",
        subJectId: "",
        colorId: "",
    });
    const [joinClassdata, setJoinClassData] = useState('');
    const [statusData, setStatusData] = useState<resourceProps[]>([]);
    const [subjectData, setSubjectData] = useState<resourceProps[]>([]);
    const [colorsData, setColorsData] = useState<resourceProps[]>([]);
    const [classroomData, setClassroomData] = useState<classroomProps[]>([]);
    const [copied, setCopied] = useState(false);
    const [selectedShare, setSelectedShare] = useState('');
    const [isShare, setIsShare] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        if (session?.user.roleId === 2) {
            setdisableJoin(true);
            setdisableCreate(false);
        } else {
            setdisableJoin(false);
            setdisableCreate(true);
        }
        loadResource();
    }, [session]);

    useEffect(() => {
        setPageName("Group");
    }, [setPageName]);

    const loadResource = async () => {
        try {
            setIsLoading(true)
            const classStatus = await resource('classStatus');
            setStatusData(classStatus);
            const subJects = await resource('subJects');
            setSubjectData(subJects);
            const colors = await resource('colors');
            setColorsData(colors);

            const cls = await classroom(session?.user.id + '');
            setClassroomData(cls);

        } catch (err) {
            console.error("Error fetching resource:", err);
        } finally {
            setIsLoading(false);
        }
    };


    const JoinDialog = () => {
        setIsJoin(!isJoin);
        setJoinClassData("");
    }

    const CreateDialog = () => {
        setIsCreate(!isCreate);
        setClassData({
            name: "",
            description: "",
            statusId: "",
            subJectId: "",
            colorId: "",
        });
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setClassData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleJoinChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setJoinClassData(
            e.target.value
        );
    };

    const handleStatusChange = (value: string) => {
        handleInputChange({
            target: {
                name: 'statusId',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleSubjectChange = (value: string) => {
        handleInputChange({
            target: {
                name: 'subJectId',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleColorChange = (value: string) => {
        handleInputChange({
            target: {
                name: 'colorId',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleShareClassRoomChange = (id: string) => {
        setSelectedShare(id);
        setIsShare(true);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(selectedShare);
        setCopied(true); // แสดงข้อความว่าคัดลอกสำเร็จ
        toast("คัดลอกสำเร็จ!", {
            description: "code: " + selectedShare,
        })
    };

    const handleSetting = (id: string) => {
        router.push(`/dashboard/setting-class/${id}`);

    };

    const handleClickClassRoom = (id: string) => {
        console.log('Selected Crad:', id);
    };

    const CreateClass = async () => {
        try {
            const { name, description, statusId, subJectId, colorId } = classData;
            const res = await axios.post(Backend_URL + "/class-room/create", {
                creatorId: session?.user.id,
                name,
                description,
                statusId: statusId ? Number(statusId) : null,
                colorId: colorId ? Number(colorId) : null,
                subJectId: subJectId ? Number(subJectId) : null,
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            toast("สร้างห้องเรียนสำเร็จ!", {
                description: "ชื่อห้องเรียน: " + res.data.name,
                action: (<Button style={{ marginLeft: "auto" }} onClick={() => { setIsShare(!isShare), setSelectedShare(res.data.code) }} >แชร์</Button>
                )
            })

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    toast("เกิดข้อผิดพลาดในการสร้างห้องเรียน!", {
                        style: { backgroundColor: "#fee2e2" },
                        description: "ข้อผิดพลาด:" + error.response.data.message,

                    })

                } else {
                    toast("เกิดข้อผิดพลาดในการสร้างห้องเรียน!", {
                        style: { backgroundColor: "#fee2e2" },
                        description: "ข้อผิดพลาด:ที่ไม่รู้จัก",

                    })
                }
            } else if (error instanceof Error) {
                toast("เกิดข้อผิดพลาดในการสร้างห้องเรียน!", {
                    style: { backgroundColor: "#fee2e2" },
                    description: "ข้อผิดพลาด:" + error.message,

                })
            }
        } finally {
            setIsCreate(!isCreate);
            setClassData({
                name: "",
                description: "",
                statusId: "",
                subJectId: "",
                colorId: "",
            })

            loadResource();
        }
    }


    const JoinClass = async () => {
        try {

            const res = await axios.post(Backend_URL + "/class-room/join", {
                userId: session?.user.id,
                code: joinClassdata
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            toast("เข้าร่วมห้องเรียนสำเร็จ!", {
                // description: "ชื่อห้องเรียน: " + res.data.name,
                // action: (<Button style={{ marginLeft: "auto" }} onClick={() => { setIsShare(!isShare), setSelectedShare(res.data.code) }} >แชร์</Button>
                // )
            })

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    toast("เกิดข้อผิดพลาดในการเข้าร่วมห้องเรียน!", {
                        style: { backgroundColor: "#fee2e2" },
                        description: "ข้อผิดพลาด:" + error.response.data.message,

                    })

                } else {
                    toast("เกิดข้อผิดพลาดในการเข้าร่วมห้องเรียน!", {
                        style: { backgroundColor: "#fee2e2" },
                        description: "ข้อผิดพลาด:ที่ไม่รู้จัก",

                    })
                }
            } else if (error instanceof Error) {
                toast("เกิดข้อผิดพลาดในการเข้าร่วมห้องเรียน!", {
                    style: { backgroundColor: "#fee2e2" },
                    description: "ข้อผิดพลาด:" + error.message,

                })
            }
        } finally {
            setIsJoin(!isJoin);
            setJoinClassData("");
            loadResource();
        }


    }



    return (
        <>

            {/* Loading a class group*/}
            <AlertDialog open={isLoading}>
                <AlertDialogContent className="cursor-progress">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="animate-pulse">กำลังโหลด ห้องเรียน...</AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                        <div className="flex justify-center items-center ">
                            <Loader size={40} className="animate-spin text-gray-500" />
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


            {/* share*/}
            <AlertDialog open={isShare}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>แชร์ ห้องเรียน</AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                        <div className="">
                            <div className="flex justify-start items-center space-x-1 text-gray-600">
                                <Code size={20} />
                                <p>Code</p>
                            </div>
                            <p className="p-1 border rounded-md">{selectedShare}</p>
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsShare(!isShare)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCopy}>Copy</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


            {/* join */}
            <AlertDialog open={isJoin}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Join</AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                        <div className="">
                            <div className="flex justify-start items-center space-x-1 text-gray-600">
                                <Code size={20} />
                                <p>Code</p>
                            </div>
                            <Input
                                className=" rounded-md bg-background"
                                placeholder="Join..."
                                onChange={handleJoinChange}
                                id="code"
                                name="code"
                                value={joinClassdata}
                            />
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={JoinDialog}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={JoinClass}>Join</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Create */}
            <AlertDialog open={isCreate}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Create Classroom</AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                        <div className="space-y-2">
                            <div className="space-x-1">
                                <div className="flex justify-start items-center space-x-1  text-gray-600">
                                    <School size={20} />
                                    <p>ชื่อห้องเรียน</p>
                                </div>
                                <Input
                                    onChange={handleInputChange}
                                    className=" rounded-md bg-background"
                                    placeholder="ชื่อห้องเรียน..."
                                    id="name"
                                    name="name"
                                    value={classData.name}
                                    maxLength={30}
                                />
                            </div>
                            <div className="space-x-1">
                                <div className="flex justify-start items-center space-x-1 text-gray-600">
                                    <Frame size={20} />
                                    <p>คำอธิบาย</p>
                                </div>
                                <Textarea
                                    onChange={handleInputChange}
                                    value={classData.description}
                                    id="description"
                                    name="description"
                                    maxLength={200}
                                    placeholder="คำอธิบาย..."
                                />
                            </div>
                            <div className="space-x-1">
                                <div className="flex justify-start items-center space-x-1 text-gray-600">
                                    <Layers3 size={20} />
                                    <p>สถานะ</p>
                                </div>
                                <Select onValueChange={handleStatusChange} name='statusId'>
                                    <SelectTrigger className="w-full rounded-r-md text-sm text-gray-500">
                                        <SelectValue placeholder="เลือก:สถานะห้องเรียน" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusData.map((status) => (
                                            <SelectItem key={status.id} value={status.id.toString()}>
                                                {status.name.charAt(0).toLocaleUpperCase() + status.name.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-x-1">
                                <div className="flex justify-start items-center space-x-1 text-gray-600">
                                    <Layers3 size={20} />
                                    <p>หมวดหมู่วิชา</p>
                                </div>
                                <Select onValueChange={handleSubjectChange} name='subJectId'>
                                    <SelectTrigger className="w-full rounded-r-md text-sm text-gray-500">
                                        <SelectValue placeholder="เลือก:หมวดหมู่วิชา" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjectData.map((subject) => (
                                            <SelectItem key={subject.id} value={subject.id.toString()}>
                                                {subject.name.charAt(0).toLocaleUpperCase() + subject.name.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-x-1">
                                <div className="flex justify-start items-center space-x-1 text-gray-600">
                                    <Palette size={20} />
                                    <p>color</p>
                                </div>
                                <Select onValueChange={handleColorChange} name='colorId'>
                                    <SelectTrigger className="w-full rounded-r-md text-sm text-gray-500">
                                        <SelectValue placeholder="เลือก:color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {colorsData.map((color) => (
                                            <SelectItem key={color.id} value={color.id.toString()}>
                                                <div className="flex gap-2">
                                                    <div className={`w-12 h-4 ${colorMapping[color.name]} rounded-md`}></div>
                                                    {color.name.charAt(0).toLocaleUpperCase() + color.name.slice(1)}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={CreateDialog}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={CreateClass}>Create</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* button a create or join and search class room */}
            <div className="relative grid w-full">
                <div className="z-10 p-2 w-full fixed  md:right-4 flex justify-end items-center bg-background/70 backdrop-filter backdrop-blur-md">
                    <div className="flex justify-center items-center">
                        <div className="p-2 bg-primary/90 rounded-l-md text-gray-200  backdrop-filter backdrop-blur-md">
                            <Search size={20} />
                        </div>
                        <Input onChange={handleSearchChange} className="bg-background" placeholder="search..." />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="p-1 h-9 bg-primary/90 text-gray-200 rounded-r-md backdrop-filter backdrop-blur-md hover:text-gray-200 hover:bg-primary">
                            <div className="flex items-center gap-1">
                                <CirclePlus size={20} />
                                <p className="text-sm">Create or Join</p>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Create or Join</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem disabled={disableCreate} onClick={CreateDialog} className="cursor-pointer">Create</DropdownMenuItem>
                            <DropdownMenuItem disabled={disableJoin} onClick={JoinDialog} className="cursor-pointer">Join</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {/* show  card Class group */}
                <div className="flex flex-wrap gap-4 mt-12 p-4">
                    {classroomData
                        .filter((cls) =>
                            cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            cls.firstNameTeacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            cls.lastNameTeacher.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((cls) => (
                            <div key={cls.id}>
                                <CardClass
                                    id={cls.id}
                                    name={cls.name}
                                    userId={cls.userId}
                                    fteacher={cls.firstNameTeacher}
                                    lteacher={cls.lastNameTeacher}
                                    total={cls.userCount}
                                    status={cls.status}
                                    subject={cls.subject}
                                    color={cls.colorName}
                                    role={cls.classRoleId}
                                    permission={cls.permissionId}
                                    onShare={handleShareClassRoomChange}
                                    onsetSetting={handleSetting}
                                    onClickClassRoom={handleClickClassRoom}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default GroupPage;

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
