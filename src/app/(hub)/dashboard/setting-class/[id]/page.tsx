'use client'
import { userMemberData } from "@/app/api/fetchMemberData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { usePageContext } from "@/contexts/page-context";
import { MemberProps } from "@/types/class-member-data";
import { CalendarClock, CalendarCog, Code, Frame, Layers3, Maximize, Palette, School, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { data: session, status } = useSession();
    const { setPageName } = usePageContext();
    const [id, setId] = useState<string | null>(null);
    const [role, setRole] = useState(false);
    const [memberData, setMemberData] = useState<MemberProps[]>([]);
    const [selectSetting, setSelectSetting] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
            setPageName("Dashboard/Group/Setting");

            // โหลด resource หลังจากได้ id แล้ว
            if (session && resolvedParams.id) {
                await loadResource(resolvedParams.id);
            }
        };

        fetchData();
    }, [params, session]);

    const loadResource = async (id: string) => {
        try {
            const data = await userMemberData(session?.user.id + '', id + '');
            setMemberData(data);
        } catch (error) {

        }
    };


    return (
        <>


            {/* {memberData.map((user) => (
                <div key={user.id}>
                    <p>user</p>
                    <p>{user.fname}</p>
                    <p>{user.lname}</p>
                    <p>{user.classRoleName}</p>
                    <p>{user.permissionName}</p>
                </div>
            ))} */}


            <div className="relative bg-secondary/50 w-full grid justify-items-start max-w-[40rem] p-2 rounded-sm">
                <div className="z-10 flex cursor-pointer">
                    <div
                        className={`p-1 w-32 rounded-l-md text-center ${selectSetting === 0 ? 'bg-primary text-gray-100' : 'bg-background'}`}
                        onClick={() => setSelectSetting(0)}
                    >
                        <p>ห้องเรียน</p>
                    </div>
                    <div
                        className={`p-1 w-32 rounded-r-md text-center ${selectSetting === 1 ? 'bg-primary text-gray-100' : 'bg-background'}`}
                        onClick={() => setSelectSetting(1)}
                    >
                        <p>สมาชิก</p>
                    </div>
                </div>
                <div className="w-full p-2">
                    {
                        selectSetting === 0 ?
                            <div className="space-y-2 w-full">
                                <div className="grid">
                                    <div className="space-x-1">
                                        <div className="flex justify-between items-center space-x-1 text-gray-600 mb-1">
                                            <div className="flex space-x-1">
                                                <Code size={20} />
                                                <p>Code</p>
                                            </div>
                                            <Button>Copy</Button>
                                        </div>
                                        <p className="bg-background p-1 border rounded-md">selectedShare</p>
                                    </div>
                                </div>
                                <div className="space-x-1">
                                    <div className="flex justify-start items-center space-x-1  text-gray-600">
                                        <User size={20} />
                                        <p>ผู้สร้าง</p>
                                    </div>
                                    <Input
                                        // onChange={handleInputChange}
                                        // value={classData.name}
                                        className=" rounded-md bg-background"
                                        placeholder="ชื่อผู้สร้าง..."
                                        id="creator"
                                        name="creator"
                                        maxLength={30}
                                    />
                                </div>
                                <div className="space-x-1">
                                    <div className="flex justify-start items-center space-x-1  text-gray-600">
                                        <School size={20} />
                                        <p>ชื่อห้องเรียน</p>
                                    </div>
                                    <Input
                                        // onChange={handleInputChange}
                                        // value={classData.name}
                                        className=" rounded-md bg-background"
                                        placeholder="ชื่อห้องเรียน..."
                                        id="name"
                                        name="name"
                                        maxLength={30}
                                    />
                                </div>
                                <div className="space-x-1">
                                    <div className="flex justify-start items-center space-x-1  text-gray-600">
                                        <Maximize size={20} />
                                        <p>max score</p>
                                    </div>
                                    <Input
                                        // onChange={handleInputChange}
                                        // value={classData.name}
                                        className=" rounded-md bg-background"
                                        placeholder="100"
                                        id="maxscore"
                                        name="maxscore"
                                        maxLength={30}
                                    />
                                </div>
                                <div className="space-x-1">
                                    <div className="flex justify-start items-center space-x-1 text-gray-600">
                                        <Frame size={20} />
                                        <p>คำอธิบาย</p>
                                    </div>
                                    <Textarea
                                        className="bg-background"
                                        // onChange={handleInputChange}
                                        // value={classData.description}
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
                                    <Select name='statusId'>
                                        <SelectTrigger className="w-full rounded-r-md text-sm text-gray-500 bg-background">
                                            <SelectValue placeholder="เลือก:สถานะห้องเรียน" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={"1"}>
                                                สถานะห้องเรียน1
                                            </SelectItem>
                                            <SelectItem value={"2"}>
                                                สถานะห้องเรียน2
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-x-1">
                                    <div className="flex justify-start items-center space-x-1 text-gray-600">
                                        <Layers3 size={20} />
                                        <p>หมวดหมู่วิชา</p>
                                    </div>
                                    <Select name='statusId'>
                                        <SelectTrigger className="w-full rounded-r-md text-sm text-gray-500 bg-background">
                                            <SelectValue placeholder="เลือก:หมวดหมู่วิชา" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={"1"}>
                                                หมวดหมู่วิชา1
                                            </SelectItem>
                                            <SelectItem value={"2"}>
                                                หมวดหมู่วิชา2
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-x-1">
                                    <div className="flex justify-start items-center space-x-1 text-gray-600">
                                        <Palette size={20} />
                                        <p>Color</p>
                                    </div>
                                    <Select name='statusId'>
                                        <SelectTrigger className="w-full rounded-r-md text-sm text-gray-500 bg-background">
                                            <SelectValue placeholder="เลือก:Color" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={"1"}>
                                                Color1
                                            </SelectItem>
                                            <SelectItem value={"2"}>
                                                Color2
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-x-1">
                                    <div className="flex justify-start items-center space-x-1  text-gray-600 ">
                                        <CalendarClock size={20} />
                                        <p>วันที่สร้าง</p>
                                    </div>
                                    <Input
                                        // onChange={handleInputChange}
                                        // value={classData.name}
                                        className=" rounded-md bg-background"
                                        placeholder="วันที่สร้าง..."
                                        id="date_at"
                                        name="date_at"
                                    />
                                </div>
                                <div className="space-x-1">
                                    <div className="flex justify-start items-center space-x-1  text-gray-600">
                                        <CalendarCog size={20} />
                                        <p>วันที่อัปเดต</p>
                                    </div>
                                    <Input
                                        // onChange={handleInputChange}
                                        // value={classData.name}
                                        className=" rounded-md bg-background"
                                        placeholder="วันที่อัปเดต..."
                                        id="update_at"
                                        name="update_at"
                                    />
                                </div>
                                <div className="flex space-x-1">
                                    <Button
                                        variant={"destructive"}
                                    >
                                        ลบห้องเรียน
                                    </Button>
                                    <Button
                                        variant={"default"}
                                    >
                                        บันทึกห้องเรียน
                                    </Button>
                                </div>

                            </div>
                            : selectSetting === 1 ?
                                <div><p>สมาชิก</p></div>
                                :
                                <div><p>กรุณาเลือก</p></div>
                    }
                </div>

            </div>




        </>
    )
}

