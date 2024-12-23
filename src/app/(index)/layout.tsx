"use client"
import Link from 'next/link';
import { ModeToggle } from "@/components/ui/theme-mode-toggle";
import { LogIn, UserPlus } from "lucide-react"; 

export default function HubLayout({
    children,
}: {
    children: React.ReactNode,
}) { 
    return (
        <>
            <main className="relative">
                <div className="z-20 bg-background fixed top-0 w-full p-1 flex justify-between items-center border-b border-primary/20 space-x-1">
                    <div className='bg-accent rounded-md  w-10 h-10 text-center'>

                    </div>
                    <div className='flex space-x-1'>
                        <Link href={"/"}
                            className={`text-gray-50 bg-primary p-1 px-4 text-sm border border-primary/30 rounded-md`}>
                            <div className='flex items-center space-x-1'><LogIn /><p>เข้าสู่ระบบ</p></div>
                        </Link>
                        <Link href={"/signup"}
                            className={`bg-gray-50/5 hover:text-primary p-1 px-4 text-sm border border-primary/30 rounded-md text-gray-500`}>
                            <div className='flex items-center space-x-1'><UserPlus /><p>ลงทะเบียน</p></div>
                        </Link>
                        <ModeToggle />
                    </div>
                </div>
                <div className="flex mt-12">
                    <div className="w-full overflow-x-auto bg-violet-100/10 dark:bg-violet-950/5  rounded-xl">
                        <div className="sm:h-[calc(99vh-40px)] overflow-auto">
                            <div className="w-full flex justify-center mx-auto overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
                                <div className="w-full md:max-w-[40rem] ">{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
