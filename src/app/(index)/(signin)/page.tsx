"use client"
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LockKeyhole, LogIn, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { validateSignin } from "@/lib/validate-data/signin";
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';


type Props = {}

function Signin({ }: Props) {
  const [isShowPass, setIsShowPass] = useState(false);
  const [notification, setNotification] = useState("");
  const [notificationStyle, setNotificationStyle] = useState("");
  const router = useRouter(); 
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSignin = async () => {
    try {
      const { email, password } = data;
      validateSignin(email, password);
      const signInData = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false
      });
      if (signInData?.error) {
        setNotificationStyle("text-red-500 bg-red-600/10 p-1 rounded-sm");
        setNotification('รหัสผ่าน หรือ อีเมล ไม่ถูกต้อง!');
      } else {
        router.push("/group");
      }
    } catch (error) {
      setNotificationStyle("text-red-500 bg-red-600/10 p-1 rounded-sm");
      if (error instanceof Error) {
        setNotification(error.message);
      }
    } finally {

    }
  }

  return (
    <>
      <div className='p-2 border border-primary/10 space-y-2 mt-12 bg-blue-100/5 rounded-sm'>
        <div className='h-44 w-full'>

        </div>
        <p className={`${notificationStyle}`}>{notification}</p>
        <div className="flex justify-start items-center">
          <div className='p-1 h-9 bg-primary text-gray-300 rounded-l-md'>
            <Mail size={25} />
          </div>
          <Input
            className=" rounded-r-md"
            placeholder="อีเมล"
            type='email'
            id='email'
            name='email'
            value={data.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative flex justify-start items-center">
          <div className='p-1 h-9 bg-primary text-gray-300 rounded-l-md'>
            <LockKeyhole size={25} />
          </div>
          <Input
            className="rounded-r-md"
            placeholder="รหัสผ่าน"
            type={!isShowPass ? 'password' : 'text'}
            id='password'
            name='password'
            value={data.password}
            onChange={handleInputChange}
          />
          <div
            onClick={() => setIsShowPass(!isShowPass)}
            className=" absolute right-2 text-gray-400 hover:text-gray-500 cursor-pointer">
            {
              !isShowPass ?
                (<EyeOff />)
                :
                (<Eye />)
            }

          </div>
        </div>
        <Button
          onClick={handleSignin}
        >
          <LogIn />
          เข้าสู่ระบบ
        </Button>
        <p className='text-md mt-1'>คุณยังไม่มีรหัสผ่าน <Link href={"/signup"} className='text-primary/80 underline'>ลงทะเบียน</Link> เลย?</p>
      </div>
    </>
  )
}

export default Signin