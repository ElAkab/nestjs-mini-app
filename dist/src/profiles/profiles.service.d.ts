import { ProfileDto } from "./dto/profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { FilterProfilesDto } from "./dto/filter-profiles.dto";
import { UUID } from "crypto";
export declare class ProfilesService {
    profiles: ProfileDto[];
    createProfile(profile: ProfileDto): ProfileDto;
    getProfiles(filters?: FilterProfilesDto): ProfileDto[];
    getProfileById(id: UUID): ProfileDto;
    updateProfile(id: string, body: UpdateProfileDto): ProfileDto;
    deleteProfile(id: string): number;
    clearProfiles(): number;
}
