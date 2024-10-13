import { Strategy } from 'passport-jwt';
interface JwtPayload {
    username: string;
    sub: number;
    role: string;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        userId: number;
        username: string;
        role: string;
    }>;
}
export {};
