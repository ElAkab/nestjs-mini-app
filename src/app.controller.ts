import { Controller, Post, Get, Put, Delete } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("profiles")
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getAll(): string {
		return this.appService.getHello();
	}
}
