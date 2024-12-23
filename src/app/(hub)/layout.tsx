"use client"
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar"; 
import { PageProvider } from "@/contexts/page-context";  
export default function HubLayout({
    children,
}: {
    children: React.ReactNode,
}) { 
    return (
        <PageProvider>
            <main className="relative">
                <div className="z-20 fixed top-0 w-full h-12">
                    <Navbar />
                </div>
                <div className="flex mt-11">
                    <Sidebar />
                    <div className="w-full overflow-x-auto bg-violet-100/10 dark:bg-violet-950/5  rounded-xl">
                        <div className="sm:h-[calc(99vh-40px)] overflow-auto">
                            <div className="w-full flex justify-center mx-auto overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
                                <div className="w-full md:max-w-full ">{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </PageProvider>
    )
}
