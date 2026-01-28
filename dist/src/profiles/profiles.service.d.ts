import { ProfileDto } from "./dto/profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { FilterProfilesDto } from "./dto/filter-profiles.dto";
type ProfileId = string;
export declare class ProfilesService {
    profiles: ProfileDto[];
    createProfile(profile: ProfileDto): ProfileDto;
    getProfiles(filters?: FilterProfilesDto): ProfileDto[];
    private applyFilters;
    getProfileById(id: ProfileId): ProfileDto;
    updateProfile(id: ProfileId, body: UpdateProfileDto): ProfileDto;
    deleteProfile(id: string): void;
    clearProfiles(): void;
}
export {};
