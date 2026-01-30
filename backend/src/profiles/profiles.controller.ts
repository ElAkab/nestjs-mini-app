import {
	Controller,
	Post,
	Get,
	Put,
	Delete,
	// ParseUUIDPipe,
	Param,
	Query,
	Body,
	HttpCode,
	HttpStatus,
} from "@nestjs/common";
// ParseUUIDPipe is used to validate UUID parameters
// import type { UUID } from "crypto";
import { ProfilesService } from "./profiles.service.js";
import { ProfileDto } from "./dto/profile.dto.js";
import { UpdateProfileDto } from "./dto/update-profile.dto.js";
import { FilterProfilesDto } from "./dto/filter-profiles.dto.js";

@Controller("profiles")
export class ProfilesController {
	constructor(private profilesService: ProfilesService) {}

	@Post()
	async create(@Body() profile: ProfileDto): Promise<ProfileDto> {
		return this.profilesService.createProfile(profile);
	}

	@Get()
	async getAll(@Query() filters: FilterProfilesDto): Promise<ProfileDto[]> {
		return this.profilesService.getProfiles(filters);
	}

	// ! Not the best way to do it, better to use Param decorator
	// @Get("profiles/:id")
	// getById(id: UUID): ProfileDto {
	// 	return this.appService.getProfileById(id);
	// }

	@Get(":id")
	async getById(@Param("id") id: number): Promise<ProfileDto> {
		return this.profilesService.getProfileById(id);
	}

	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	async delete(@Param("id") id: number): Promise<void> {
		return this.profilesService.deleteProfile(id);
	}

	@Delete()
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteAll(): Promise<void> {
		return this.profilesService.clearProfiles();
	}

	@Put(":id")
	async update(
		@Param("id") id: number,
		@Body() profile: UpdateProfileDto,
	): Promise<ProfileDto> {
		return this.profilesService.updateProfile(id, profile);
	}
}
