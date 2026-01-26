import { Controller, Post, Get, Put, Delete } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
	constructor(private appService: AppService) {}

	@Get("users")
	getAll(): string {
		return this.appService.getHello();
	}

	// todo 3 : Add route handlers that use the service methods to manipulate the data container
}
