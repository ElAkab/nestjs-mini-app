/// <reference types="node" />
import { ProfileDto } from "./dto/profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UUID } from "crypto";
export declare class AppService {
    profiles: ProfileDto[];
    createProfile(profile: ProfileDto): ProfileDto;
    getProfiles(): ProfileDto[];
    getProfileById(id: UUID): ProfileDto;
    updateProfile(id: string, body: UpdateProfileDto): ProfileDto;
    deleteProfile(id: string): number;
    clearProfiles(): number;
}
