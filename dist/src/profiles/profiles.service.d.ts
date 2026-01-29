import { ProfileDto } from "./dto/profile.dto.js";
import { UpdateProfileDto } from "./dto/update-profile.dto.js";
import { FilterProfilesDto } from "./dto/filter-profiles.dto.js";
export declare class ProfilesService {
    createProfile(profile: ProfileDto): Promise<ProfileDto>;
    getProfiles(filters?: FilterProfilesDto): Promise<ProfileDto[]>;
    getProfileById(id: number): Promise<ProfileDto>;
    updateProfile(id: number, body: UpdateProfileDto): Promise<ProfileDto>;
    deleteProfile(id: number): Promise<void>;
    clearProfiles(): Promise<void>;
}
