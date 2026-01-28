import { UUID } from "crypto";
declare class ProfileDto {
    id?: UUID;
    username: string;
    age: number;
    email: string;
    password: string;
    bio?: string;
    vaccinated?: boolean;
}
export { ProfileDto };
