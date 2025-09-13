import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export class JwtService {

    static generateToken(payload: object, options: SignOptions = {}): string {
        const defaultOptions: SignOptions = { expiresIn: "1h" };
        return jwt.sign(payload, SECRET, { ...defaultOptions, ...options });
    }

    static verifyToken(token: string): JwtPayload | string | null {
        try {
            return jwt.verify(token, SECRET);
        } catch (error) {
            console.error("Invalid or expired token:", (error as Error).message);
            throw new Error("Invalid or expired token");
        }
    }

    static decodeToken(token: string): JwtPayload | null {
        return jwt.decode(token) as JwtPayload | null;
    }
}