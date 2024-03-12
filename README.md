# chalender.ch frontend

This is the source code for the chalender.ch PWA.

## Technology Stack

- Frontend: Angular
- Server-Side Rendering: Angular Universal
- Styling: SCSS
- CI/CD: GitHub Actions for continuous integration and deployment

## Getting Started

To get started with Chalender.ch, follow these steps:

### Prerequisites

Ensure you have the following installed:

- Node.js (LTS version)
- npm (latest version)

### Installation

1. Clone the repository

2. Navigate to the project directory

3. Install dependencies:

   `npm install`

### Running the Application

To run the application locally:

1. Build and serve the application with SSR:

   `npm run dev:ssr`

2. Open your browser and navigate to `http://localhost:4200`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Tecnical notes

### Back routing

To restore the events in the events list after back routing, a router reuse strategy is defined.
For all the routes that contain a `reuseRouteKey` parameter in the route data, the `RouteReuseStrategy` will be used. `reuseRouteKey` should be unique.

To have access to `onAttach` and `onDetach` lifecycle events, we implement our own router outlet. This router outlet will be used in the `app.component.html` file.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Contributing

We welcome contributions to the chalender.ch API! If you have suggestions for improvement or want to contribute code, please feel free to fork the repository and submit a pull request.

## License

This project is licensed under the Mozilla Public License 2.0 (MPL 2.0) - see the [LICENSE](LICENSE.md) file for details.
