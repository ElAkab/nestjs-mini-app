import type { UUID } from "crypto";
import { ProfilesService } from "./profiles.service";
import { ProfileDto } from "./dto/profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { FilterProfilesDto } from "./dto/filter-profiles.dto";
export declare class ProfilesController {
    private profilesService;
    constructor(profilesService: ProfilesService);
    create(profile: ProfileDto): ProfileDto;
    getAll(filters: FilterProfilesDto): ProfileDto[];
    getById(id: UUID): ProfileDto;
    delete(id: UUID): void;
    deleteAll(): void;
    update(id: UUID, profile: UpdateProfileDto): ProfileDto;
}
