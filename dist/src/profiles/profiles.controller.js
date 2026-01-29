var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Post, Get, Put, Delete, Param, Query, Body, HttpCode, HttpStatus, } from "@nestjs/common";
import { ProfilesService } from "./profiles.service.js";
import { ProfileDto } from "./dto/profile.dto.js";
import { UpdateProfileDto } from "./dto/update-profile.dto.js";
import { FilterProfilesDto } from "./dto/filter-profiles.dto.js";
let ProfilesController = class ProfilesController {
    constructor(profilesService) {
        this.profilesService = profilesService;
    }
    async create(profile) {
        return this.profilesService.createProfile(profile);
    }
    async getAll(filters) {
        return this.profilesService.getProfiles(filters);
    }
    async getById(id) {
        return this.profilesService.getProfileById(id);
    }
    async delete(id) {
        return this.profilesService.deleteProfile(id);
    }
    async deleteAll() {
        return this.profilesService.clearProfiles();
    }
    async update(id, profile) {
        return this.profilesService.updateProfile(id, profile);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProfileDto]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "create", null);
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FilterProfilesDto]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "getAll", null);
__decorate([
    Get(":id"),
    __param(0, Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "getById", null);
__decorate([
    Delete(":id"),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "delete", null);
__decorate([
    Delete(),
    HttpCode(HttpStatus.NO_CONTENT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "deleteAll", null);
__decorate([
    Put(":id"),
    __param(0, Param("id")),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "update", null);
ProfilesController = __decorate([
    Controller("profiles"),
    __metadata("design:paramtypes", [ProfilesService])
], ProfilesController);
export { ProfilesController };
//# sourceMappingURL=profiles.controller.js.map