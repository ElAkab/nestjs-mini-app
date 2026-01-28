import type { UUID } from "crypto";
import { ProfilesService } from "./profiles.service";
import { ProfileDto } from "./dto/profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
export declare class ProfilesController {
    private profilesService;
    constructor(profilesService: ProfilesService);
    create(profile: ProfileDto): ProfileDto;
    getAll(): ProfileDto[];
    getById(id: UUID): ProfileDto;
    delete(id: UUID): number;
    deleteAll(): number;
    update(id: UUID, profile: UpdateProfileDto): ProfileDto;
}
