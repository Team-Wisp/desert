import User from '@/lib/models/User';
import { CreateUserDTO, UpdateUserPasswordDTO } from '@/lib/dtos/user.dto';
import bcrypt from 'bcryptjs';

export class UserService {
  static async createUser(data: CreateUserDTO) {
    return await User.create(data);
  }

  static async getUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  static async updateUserPassword(data: UpdateUserPasswordDTO) {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    return user;
  }

  static async verifyUserPassword(hashedPassword: string, plainPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
