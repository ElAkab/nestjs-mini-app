"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let ProfilesService = class ProfilesService {
    constructor() {
        this.profiles = [
            {
                id: (0, crypto_1.randomUUID)(),
                username: "john_doe",
                age: 30,
                bio: "Software developer from NY",
                vaccinated: true,
            },
            {
                id: (0, crypto_1.randomUUID)(),
                username: "jane_smith",
                age: 25,
                bio: "Graphic designer from LA",
                vaccinated: false,
            },
            {
                id: (0, crypto_1.randomUUID)(),
                username: "sam_wilson",
                age: 28,
                vaccinated: true,
            },
            {
                id: (0, crypto_1.randomUUID)(),
                username: "lisa_brown",
                age: 32,
                bio: "Content writer from TX",
                vaccinated: false,
            },
            {
                id: (0, crypto_1.randomUUID)(),
                username: "mike_jones",
                age: 29,
                bio: "Marketing specialist from FL",
                vaccinated: true,
            },
        ];
    }
    createProfile(profile) {
        if (!profile) {
            throw new common_1.HttpException("Bad Request 🖕🏿", common_1.HttpStatus.BAD_REQUEST);
        }
        const newProfile = {
            id: (0, crypto_1.randomUUID)(),
            ...profile,
        };
        this.profiles = [newProfile, ...this.profiles];
        return newProfile;
    }
    getProfiles(filters) {
        if (this.profiles.length === 0) {
            throw new common_1.NotFoundException("No profiles found");
        }
        if (!filters) {
            return this.profiles;
        }
        const vaccinated = filters.vaccinated === undefined
            ? undefined
            : filters.vaccinated === true || filters.vaccinated === "true";
        const age = filters.age === undefined || filters.age === ""
            ? undefined
            : Number(filters.age);
        const result = this.profiles.filter((p) => (vaccinated === undefined || p.vaccinated === vaccinated) &&
            (age === undefined || (!isNaN(age) && p.age === age)));
        if (result.length === 0) {
            throw new common_1.NotFoundException("No profiles found with given filters");
        }
        return result;
    }
    getProfileById(id) {
        const profile = this.profiles.find((profile) => profile.id === id);
        if (!profile) {
            throw new common_1.NotFoundException(`${common_1.HttpStatus.NOT_FOUND}: Profile with id ${id} not found`);
        }
        return profile;
    }
    updateProfile(id, body) {
        const index = this.profiles.findIndex((profile) => profile.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`${common_1.HttpStatus.NOT_FOUND}: Profile with id ${id} not found`);
        this.profiles[index] = {
            ...this.profiles[index],
            ...body,
            id: this.profiles[index].id,
        };
        return this.profiles[index];
    }
    deleteProfile(id) {
        const profile = this.profiles.find((profile) => profile.id === id);
        if (!profile)
            throw new common_1.NotFoundException(`${common_1.HttpStatus.NOT_FOUND}: Profile with id ${id} not found`);
        const index = this.profiles.indexOf(profile);
        this.profiles.splice(index, 1);
        return common_1.HttpStatus.NO_CONTENT;
    }
    clearProfiles() {
        this.profiles = [];
        return common_1.HttpStatus.NO_CONTENT;
    }
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)()
], ProfilesService);
//# sourceMappingURL=profiles.service.js.map