import { AppService } from "./app.service.js";
export declare class AppController {
    private appService;
    constructor(appService: AppService);
    hello(): string;
}
