import {
	Controller,
	Post,
	Get,
	Put,
	Delete,
	ParseUUIDPipe,
	Param,
	Query,
	Body,
	HttpCode,
	HttpStatus,
} from "@nestjs/common";
// ParseUUIDPipe is used to validate UUID parameters
import type { UUID } from "crypto";
import { ProfilesService } from "./profiles.service";
import { ProfileDto } from "./dto/profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { FilterProfilesDto } from "./dto/filter-profiles.dto";

@Controller("profiles")
export class ProfilesController {
	constructor(private profilesService: ProfilesService) {}

	@Post()
	create(@Body() profile: ProfileDto): ProfileDto {
		return this.profilesService.createProfile(profile);
	}

	@Get()
	getAll(@Query() filters: FilterProfilesDto): ProfileDto[] {
		return this.profilesService.getProfiles(filters);
	}

	// ! Not the best way to do it, better to use Param decorator
	// @Get("profiles/:id")
	// getById(id: UUID): ProfileDto {
	// 	return this.appService.getProfileById(id);
	// }

	@Get(":id")
	getById(@Param("id", ParseUUIDPipe) id: UUID): ProfileDto {
		return this.profilesService.getProfileById(id);
	}

	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	delete(@Param("id", ParseUUIDPipe) id: UUID): void {
		return this.profilesService.deleteProfile(id);
	}

	@Delete()
	@HttpCode(HttpStatus.NO_CONTENT)
	deleteAll(): void {
		return this.profilesService.clearProfiles();
	}

	@Put(":id")
	update(
		@Param("id", ParseUUIDPipe) id: UUID,
		@Body() profile: UpdateProfileDto,
	): ProfileDto {
		return this.profilesService.updateProfile(id, profile);
	}
}
