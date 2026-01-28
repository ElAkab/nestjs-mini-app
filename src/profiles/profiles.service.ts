import {
	Injectable,
	NotFoundException,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { ProfileDto } from "./dto/profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { FilterProfilesDto } from "./dto/filter-profiles.dto";
import { randomUUID, UUID } from "crypto";

@Injectable()
export class ProfilesService {
	profiles: ProfileDto[] = [
		{
			id: randomUUID(),
			username: "john_doe",
			age: 30,
			bio: "Software developer from NY",
			vaccinated: true,
		},
		{
			id: randomUUID(),
			username: "jane_smith",
			age: 25,
			bio: "Graphic designer from LA",
			vaccinated: false,
		},
		{
			id: randomUUID(),
			username: "sam_wilson",
			age: 28,
			vaccinated: true,
		},
		{
			id: randomUUID(),
			username: "lisa_brown",
			age: 32,
			bio: "Content writer from TX",
			vaccinated: false,
		},
		{
			id: randomUUID(),
			username: "mike_jones",
			age: 29,
			bio: "Marketing specialist from FL",
			vaccinated: true,
		},
	];

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

	getProfiles(filters?: FilterProfilesDto): ProfileDto[] {
		if (this.profiles.length === 0) {
			throw new NotFoundException("No profiles found");
		}

		if (!filters) {
			return this.profiles;
		}

		const vaccinated =
			filters.vaccinated === undefined
				? undefined
				: filters.vaccinated === true || filters.vaccinated === "true";

		const age =
			filters.age === undefined || filters.age === ""
				? undefined
				: Number(filters.age);

		const result = this.profiles.filter(
			(p) =>
				(vaccinated === undefined || p.vaccinated === vaccinated) &&
				(age === undefined || (!isNaN(age) && p.age === age)),
		);

		if (result.length === 0) {
			throw new NotFoundException("No profiles found with given filters");
		}

		return result;
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
		this.profiles[index] = {
			...this.profiles[index],
			...body,
			id: this.profiles[index].id,
		};
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
