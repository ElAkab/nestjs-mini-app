var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, NotFoundException, BadRequestException, HttpStatus, } from "@nestjs/common";
import { prisma } from "../lib/prisma.js";
let ProfilesService = class ProfilesService {
    async createProfile(profile) {
        if (!profile) {
            throw new BadRequestException("Profile data is required");
        }
        const { username, bio, vaccinated, userId } = profile;
        if (!username || !userId)
            throw new BadRequestException("Username, and userId are required fields");
        const existingProfile = await prisma.profile.findUnique({
            where: { userId: userId },
        });
        if (existingProfile)
            throw new BadRequestException(`Profile for userId ${userId} already exists`);
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
    async getProfiles(filters) {
        const where = {};
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
    async getProfileById(id) {
        const profile = await prisma.profile.findUnique({ where: { id } });
        if (!profile) {
            throw new NotFoundException(`${HttpStatus.NOT_FOUND}: Profile with id ${id} not found`);
        }
        return { ...profile, age: profile.age ?? 0, bio: profile.bio ?? undefined };
    }
    async updateProfile(id, body) {
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
        }
        catch (error) {
            throw new NotFoundException(`${HttpStatus.NOT_FOUND}: Profile with id ${id} not found`);
        }
    }
    async deleteProfile(id) {
        try {
            await prisma.profile.delete({ where: { id } });
        }
        catch (error) {
            throw new NotFoundException(`${HttpStatus.NOT_FOUND}: Profile with id ${id} not found`);
        }
    }
    async clearProfiles() {
        await prisma.profile.deleteMany();
    }
};
ProfilesService = __decorate([
    Injectable()
], ProfilesService);
export { ProfilesService };
//# sourceMappingURL=profiles.service.js.map