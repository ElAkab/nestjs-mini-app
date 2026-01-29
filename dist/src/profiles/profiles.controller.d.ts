import { ProfilesService } from "./profiles.service.js";
import { ProfileDto } from "./dto/profile.dto.js";
import { UpdateProfileDto } from "./dto/update-profile.dto.js";
import { FilterProfilesDto } from "./dto/filter-profiles.dto.js";
export declare class ProfilesController {
    private profilesService;
    constructor(profilesService: ProfilesService);
    create(profile: ProfileDto): Promise<ProfileDto>;
    getAll(filters: FilterProfilesDto): Promise<ProfileDto[]>;
    getById(id: number): Promise<ProfileDto>;
    delete(id: number): Promise<void>;
    deleteAll(): Promise<void>;
    update(id: number, profile: UpdateProfileDto): Promise<ProfileDto>;
}
