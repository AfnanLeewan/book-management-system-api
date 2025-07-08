import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
interface AuthenticatedRequest extends Request {
    user: User;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("./auth.service").AuthResponse>;
    login(loginDto: LoginDto): Promise<import("./auth.service").AuthResponse>;
    getProfile(req: AuthenticatedRequest): {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: import("./entities/user.entity").UserRole;
    };
}
export {};
