/// <reference types="node" />
import type { UUID } from "crypto";
import { AppService } from "./app.service";
import { ProfileDto } from "./dto/profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
export declare class AppController {
    private appService;
    constructor(appService: AppService);
    create(profile: ProfileDto): ProfileDto;
    getAll(): ProfileDto[];
    getById(id: UUID): ProfileDto;
    delete(id: UUID): number;
    update(id: UUID, profile: UpdateProfileDto): ProfileDto;
}
