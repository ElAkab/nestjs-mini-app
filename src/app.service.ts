import {
	Injectable,
	NotFoundException,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { ProfileDto } from "./dto/profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { randomUUID, UUID } from "crypto";

@Injectable()
export class AppService {
	// todo 1 : Create data container ->
	profiles: ProfileDto[] = [
		{
			id: randomUUID(),
			username: "john_doe",
			age: 30,
			bio: "Software developer from NY",
		},
		{
			id: randomUUID(),
			username: "jane_smith",
			age: 25,
			bio: "Graphic designer from LA",
		},
		{
			id: randomUUID(),
			username: "sam_wilson",
			age: 28,
		},
		{
			id: randomUUID(),
			username: "lisa_brown",
			age: 32,
			bio: "Content writer from TX",
		},
		{
			id: randomUUID(),
			username: "mike_jones",
			age: 29,
			bio: "Marketing specialist from FL",
		},
	];

	// todo 2 : Add methods to manipulate data container (CRUD) ->
	createProfile(profile: ProfileDto): ProfileDto {
		if (!profile) {
			throw new HttpException("Bad Request 🖕🏿", HttpStatus.BAD_REQUEST);
		}

		// this.profiles.push(profile);
		const newProfile: ProfileDto = {
			id: randomUUID(),
			...profile,
		};

		this.profiles = [newProfile, ...this.profiles];
		return newProfile;
	}

	getProfiles(): ProfileDto[] {
		if (!this.profiles) {
			throw new NotFoundException("No profiles found");
		}

		return this.profiles;
	}

	getProfileById(id: UUID): ProfileDto {
		const profile = this.profiles.find((profile) => profile.id === id);

		if (!profile) {
			throw new NotFoundException(
				`${HttpStatus.NOT_FOUND}: Profile with id ${id} not found`,
			);
		}

		return profile;
	}

	updateProfile(id: string, body: UpdateProfileDto): ProfileDto {
		const index = this.profiles.findIndex((profile) => profile.id === id);

		if (index === -1)
			throw new NotFoundException(
				`${HttpStatus.NOT_FOUND}: Profile with id ${id} not found`,
			);
		// Toujours préserver l'id d'origine
		this.profiles[index] = { ...this.profiles[index], ...body, id: this.profiles[index].id };
		return this.profiles[index];
	}

	deleteProfile(id: string): number {
		const profile = this.profiles.find((profile) => profile.id === id);

		if (!profile)
			throw new NotFoundException(
				`${HttpStatus.NOT_FOUND}: Profile with id ${id} not found`,
			);

		const index = this.profiles.indexOf(profile);

		this.profiles.splice(index, 1);
		return HttpStatus.NO_CONTENT;
	}

	clearProfiles(): number {
		this.profiles = [];
		return HttpStatus.NO_CONTENT;
	}
}
