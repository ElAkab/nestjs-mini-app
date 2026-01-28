import { UUID } from "crypto";
declare class ProfileDto {
    id?: UUID;
    username: string;
    age: number;
    bio?: string;
    vaccinated?: boolean;
}
export { ProfileDto };
