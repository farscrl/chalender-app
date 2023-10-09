# ChalenderFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Tecnical explanations

### Back routing

To restore the events in the events list after back routing, a router reuse strategy is defined.
For all the routes that contain a `reuseRouteKey` parameter in the route data, the `RouteReuseStrategy` will be used. `reuseRouteKey` should be unique.

To have access to `onAttach` and `onDetach` lifecycle events, we implement our own router outlet. This router outlet will be used in the `app.component.html` file.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
