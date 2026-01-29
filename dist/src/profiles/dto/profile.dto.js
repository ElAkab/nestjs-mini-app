var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNumber, IsBoolean, Length, Min, Max, IsOptional, } from "class-validator";
export class ProfileDto {
}
__decorate([
    IsString(),
    Length(3, 20),
    __metadata("design:type", String)
], ProfileDto.prototype, "username", void 0);
__decorate([
    IsNumber(),
    Min(18),
    Max(100),
    __metadata("design:type", Number)
], ProfileDto.prototype, "age", void 0);
__decorate([
    IsString(),
    Length(0, 200),
    IsOptional(),
    __metadata("design:type", String)
], ProfileDto.prototype, "bio", void 0);
__decorate([
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], ProfileDto.prototype, "vaccinated", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], ProfileDto.prototype, "userId", void 0);
//# sourceMappingURL=profile.dto.js.map