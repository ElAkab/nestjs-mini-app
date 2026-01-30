import {
	Injectable,
	NotFoundException,
	BadRequestException,
	HttpStatus,
} from "@nestjs/common";
import { ProfileDto } from "./dto/profile.dto.js";
import { UpdateProfileDto } from "./dto/update-profile.dto.js";
import { FilterProfilesDto } from "./dto/filter-profiles.dto.js";
import { prisma } from "../lib/prisma.js";

@Injectable()
export class ProfilesService {
	// Plus de tableau local, tout passe par Prisma

	async createProfile(profile: ProfileDto): Promise<ProfileDto> {
		if (!profile) {
			throw new BadRequestException("Profile data is required");
		}

		const { username, bio, vaccinated, userId } = profile;

		if (!username || !userId)
			throw new BadRequestException("Username, and userId are required fields");

		const existingProfile = await prisma.profile.findUnique({
			where: { userId: userId },
		});
		// findUnique() : Finds a single record that matches the unique constraint

		if (existingProfile)
			throw new BadRequestException(
				`Profile for userId ${userId} already exists`,
			);

		const newProfile = await prisma.profile.create({
			data: {
				username: username,
				bio: null,
				age: null,
				vaccinated: false,
				userId: userId,
			},
		});

		return {
			...newProfile,
			age: newProfile.age ?? 0,
			bio: newProfile.bio ?? undefined,
		};
	}

	async getProfiles(filters?: FilterProfilesDto): Promise<ProfileDto[]> {
		const where: any = {};

		if (filters) {
			if (filters.vaccinated !== undefined) {
				where.vaccinated =
					filters.vaccinated === true || filters.vaccinated === "true";
			}
			if (filters.age !== undefined && filters.age !== "") {
				where.age = Number(filters.age);
			}
		}

		const profiles = await prisma.profile.findMany({ where });

		if (profiles.length === 0) {
			throw new NotFoundException("No profiles found with given filters");
		}

		return profiles.map((profile) => ({
			...profile,
			age: profile.age ?? 0,
			bio: profile.bio ?? undefined,
		}));
	}

	async getProfileById(id: number): Promise<ProfileDto> {
		const profile = await prisma.profile.findUnique({ where: { id } });

		if (!profile) {
			throw new NotFoundException(
				`${HttpStatus.NOT_FOUND}: Profile with id ${id} not found`,
			);
		}

		return { ...profile, age: profile.age ?? 0, bio: profile.bio ?? undefined };
	}

	async updateProfile(id: number, body: UpdateProfileDto): Promise<ProfileDto> {
		try {
			const updatedProfile = await prisma.profile.update({
				where: { id },
				data: body,
			});
			return {
				...updatedProfile,
				age: updatedProfile.age ?? 0,
				bio: updatedProfile.bio ?? undefined,
			};
		} catch (error) {
			throw new NotFoundException(
				`${HttpStatus.NOT_FOUND}: Profile with id ${id} not found`,
			);
		}
	}

	async deleteProfile(id: number): Promise<void> {
		try {
			await prisma.profile.delete({ where: { id } });
		} catch (error) {
			throw new NotFoundException(
				`${HttpStatus.NOT_FOUND}: Profile with id ${id} not found`,
			);
		}
	}

	async clearProfiles(): Promise<void> {
		await prisma.profile.deleteMany();
	}
}
