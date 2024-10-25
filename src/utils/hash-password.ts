import bcrypt from 'bcryptjs';
const hashPassword = async (password: string) => {
    const saltRounds = +process.env.SALT_ROUNDS!;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const isPasswordMatch = async (password: string, hashedPassword: string) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

export { hashPassword, isPasswordMatch } 