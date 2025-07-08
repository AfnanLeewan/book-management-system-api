export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    created_at: Date;
    updated_at: Date;
}
