import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findOne(username: string): Promise<User | undefined>;
    createUser(username: string, password: string, role: UserRole): Promise<User>;
    register(username: string, password: string, role: UserRole): Promise<User>;
}
