export const validateSignin = (email: string ,password:string) => {

    if(!email && !password){
        throw new Error('Invalid value');
    }

    if(!email){
        throw new Error('Invalid email');
    }

    if(!password){
        throw new Error('Invalid password');
    }

    // ตรวจสอบอีเมล
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        throw new Error('Invalid email format');
    }   
};