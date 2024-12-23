"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CodeXml, Eye, EyeOff, IdCard, LockKeyhole, Mail, User, UserPlus } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { validateSignup } from "@/lib/validate-data/signup";
import { resource } from "@/app/api/resource";
import { resourceProps } from '@/types/resource';
import axios from 'axios';
import { Backend_URL } from '@/lib/constants';


type Props = {}

function Signup({ }: Props) {
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
  const [notification, setNotification] = useState("");
  const [notificationStyle, setNotificationStyle] = useState("");
  const [userRoles, setUserRoles] = useState<resourceProps[]>([]);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    role: "",
    identification: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const loadUserRoles = async () => {
      try {
        const data = await resource('userRole');
        setUserRoles(data);
      } catch (err) {
        console.error("Error fetching user roles:", err);
      }
    };

    loadUserRoles();
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    handleInputChange({
      target: {
        name: 'role',
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleSignin = async () => {

    try {
      const { fname, lname, role, identification, email, password, confirmPassword } = data;
      validateSignup(fname, lname, role, identification, email, password, confirmPassword);

      const res = await axios.post(Backend_URL + "/auth/signup", {
        fname,
        lname,
        roleId: Number(role),
        identification,
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      setNotification('สร้างบัญชีผู้ใช้สำเร็จ!');
      setNotificationStyle('bg-green-100 text-green-800 p-1')

      setData({
        fname: "",
        lname: "",
        role: "",
        identification: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error) { 
      if (axios.isAxiosError(error)) { 
        if (error.response) { 
          setNotification(error.response.data.message || 'เกิดข้อผิดพลาดในการสร้างบัญชี');
        } else { 
          setNotification('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
        }
      } else if (error instanceof Error) { 
        setNotification(error.message);
      } 
      setNotificationStyle('bg-red-100 text-red-800 p-1');
    } finally { 
    }

  }
  return (
    <>
      <div className='p-2 border border-primary/10 space-y-2 mt-12 bg-blue-100/5 rounded-sm'>
        <div className='h-44 w-full'>



        </div>
        <p className={`${notificationStyle}`}>{notification}</p>

        <div>
          <div className="flex justify-start items-center">
            <div className='p-1 h-9 bg-primary text-gray-300 rounded-l-md'>
              <User size={25} />
            </div>
            <Input
              className=" rounded-r-md"
              placeholder="ชื่อจริง"
              type='text'
              id='fname'
              name='fname'
              value={data.fname}
              maxLength={50}
              onChange={handleInputChange}
            />
          </div>
          <p className="text-sm text-gray-400">ชื่อจริงต้องมีความยาวไม่เกิน 50 ตัวอักษร</p>
        </div>

        <div>
          <div className="flex justify-start items-center">
            <div className='p-1 h-9 bg-primary text-gray-300 rounded-l-md'>
              <User size={25} />
            </div>
            <Input
              className=" rounded-r-md"
              placeholder="นามสกุล"
              type='text'
              id='lname'
              name='lname'
              value={data.lname}
              maxLength={50}
              onChange={handleInputChange}
            />
          </div>
          <p className="text-sm text-gray-400">นามสกุลต้องมีความยาวไม่เกิน 50 ตัวอักษร</p>
        </div>

        <div>
          <div className="flex justify-start items-center">
            <div className='p-1 h-9 bg-primary text-gray-300 rounded-l-md'>
              <CodeXml size={25} />
            </div>
            <Select onValueChange={handleSelectChange} name='role'>
              <SelectTrigger className="w-full rounded-r-md text-sm text-gray-500">
                <SelectValue placeholder="เลือก:บทบาท" />
              </SelectTrigger>  
              <SelectContent>
                {userRoles.map((role) => (
                  <SelectItem key={role.id} value={role.id.toString()}>
                    {role.name.charAt(0).toLocaleUpperCase() + role.name.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-gray-400">กรุณาเลือกบทบาท: นักศึกษา หรือ อาจารย์</p>
        </div>

        <div>
          <div className="flex justify-start items-center">
            <div className='p-1 h-9 bg-primary text-gray-300 rounded-l-md'>
              <IdCard size={25} />
            </div>
            <Input
              className=" rounded-r-md"
              placeholder="รหัสประจำตัว"
              type='text'
              id='identification'
              name='identification'
              value={data.identification}
              maxLength={50}
              onChange={handleInputChange}
            />
          </div>
          <p className="text-sm text-gray-400">เลขประจำตัวนักศึกษา ,เลขประจำตัวอาจารย์</p>
        </div>

        <div>
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
          <p className="text-sm text-gray-400">กรุณากรอกอีเมลให้ถูกต้องตามรูปแบบ ตัวอย่าง: example@Email.com</p>
        </div>

        <div>
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
          <p className="text-sm text-gray-400">รหัสผ่านต้องประกอบด้วยอักขระอย่างน้อย 8 ตัว โดยต้องมีตัวพิมพ์ใหญ่ (A-Z), ตัวพิมพ์เล็ก (a-z), ตัวเลข (0-9) และอักขระพิเศษ (เช่น !, @, #, $) ตัวอย่าง: MySecure@123</p>
        </div>

        <div>
          <div className="relative flex justify-start items-center">
            <div className='p-1 h-9 bg-primary text-gray-300 rounded-l-md'>
              <LockKeyhole size={25} />
            </div>
            <Input
              className="rounded-r-md"
              placeholder="ยืนยันรหัสผ่าน"
              type={!isShowConfirmPass ? 'password' : 'text'}
              id='confirmPassword'
              name='confirmPassword'
              value={data.confirmPassword}
              onChange={handleInputChange}
            />
            <div
              onClick={() => setIsShowConfirmPass(!isShowConfirmPass)}
              className=" absolute right-2 text-gray-400 hover:text-gray-500 cursor-pointer">
              {
                !isShowConfirmPass ?
                  (<EyeOff />)
                  :
                  (<Eye />)
              }

            </div>
          </div>
          <p className="text-sm text-gray-400">กรุณากรอกรหัสผ่านให้ตรงกัน</p>
        </div>

        <Button
          onClick={handleSignin}
        >
          <UserPlus />
          ลงทะเบียน
        </Button>
        <p className='text-md mt-1'>คุณมีรหัสผ่านอยู่แล้ว <Link href={"/"} className='text-primary/80 underline'>เข้าสู่ระบบ</Link> , เลย?</p>
      </div>
    </>
  )
}

export default Signup