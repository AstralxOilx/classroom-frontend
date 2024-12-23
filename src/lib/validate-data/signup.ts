export const validateSignup = (
    fname: string,
    lname: string,
    role: string,
    identification: string,
    email: string,
    password: string,
    confirmPassword: string
) => {

    if (!fname && !lname && !role && !identification && !email && !password && !confirmPassword) {
        throw new Error('Invalid Value');
    }
    if (!fname) {
        throw new Error('Invalid first name');
    }
    if (!lname) {
        throw new Error('Invalid last name');
    }
    if (!role) {
        throw new Error('Invalid role');
    }
    if (!identification) {
        throw new Error('Invalid identification');
    }
    if (!email) {
        throw new Error('Invalid email');
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        throw new Error('email must be an email');
    }
    if (!password) {
        throw new Error('Invalid password');
    } 
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,50}$/;
    if (!passwordPattern.test(password)) {
        throw new Error('Password must contain at least 8 and 50 characters, including uppercase, lowercase, number, and special character (e.g., !, @, #, $)');
    }
    if (!confirmPassword) {
        throw new Error('Invalid confirm password');
    }
    if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
    }
};
