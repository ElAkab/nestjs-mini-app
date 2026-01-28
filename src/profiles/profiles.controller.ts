import {
	Controller,
	Post,
	Get,
	Put,
	Delete,
	ParseUUIDPipe,
	Param,
	Body,
} from "@nestjs/common";
// ParseUUIDPipe is used to validate UUID parameters
import type { UUID } from "crypto";
import { ProfilesService } from "./profiles.service";
import { ProfileDto } from "./dto/profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Controller("profiles")
export class ProfilesController {
	constructor(private profilesService: ProfilesService) {}

	@Post()
	create(@Body() profile: ProfileDto): ProfileDto {
		return this.profilesService.createProfile(profile);
	}

	@Get()
	getAll(): ProfileDto[] {
		return this.profilesService.getProfiles();
	}

	// todo 3 : Add route handlers that use the service methods to manipulate the data container ->
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
	delete(@Param("id", ParseUUIDPipe) id: UUID): number {
		return this.profilesService.deleteProfile(id);
	}

	@Delete()
	deleteAll(): number {
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
