import { PartialType } from "@nestjs/mapped-types";
// PartialType allows us to create a type with all the properties of ProfileDto set to optional
import { ProfileDto } from "./profile.dto.js";

export class UpdateProfileDto extends PartialType(ProfileDto) {}
