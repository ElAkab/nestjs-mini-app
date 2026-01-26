# My NestJS Project

This is a simple NestJS application created as part of a learning exercise.

## Configuration

I could clone the official starter repository from NestJS to learn it but I want to build it from scratch to understand better how it works.

So i followed [some steps](https://dev.to/micalevisk/5-steps-to-create-a-bare-minimum-nestjs-app-from-scratch-5c3b)

## Issues that I faced

- When I created the `AppService` class, I forgot to add the `@Injectable()` decorator, which caused NestJS to throw an error when trying to inject the service into the controller. Adding the decorator resolved the issue.
- In the `AppModule`, I initially forgot to include the `AppController` in the `controllers` array. This oversight led to a 404 error when trying to access the root route. Adding the controller to the module fixed the problem ([thanks to Google](https://www.google.com)).

One last thing, that i couldn't figure out myself :
I got the app running successfully after fixing these issues !

## Running the Application

To run the application, use the following command () :

```bash
npm run start
```
