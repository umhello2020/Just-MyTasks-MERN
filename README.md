# Just-MyTasks-MERN

Deployed Link - https://just-mytasks-mern.herokuapp.com/

![image](https://github.com/umhello2020/Just-MyTasks-MERN/assets/119268105/39eb2994-1680-40d9-a1f7-09eeb99a2cc7)


MyTasks is a web application that allows users to manage their tasks and donations. Users can create, update, and delete tasks, as well as make donations to support their favorite causes.

## Features

- Task management: Users can create new tasks, update existing tasks, and mark tasks as completed.
- Donation functionality: Users can make donations to support various causes.
- User authentication: Users can sign up, log in, and access their own profile.
- Profile management: Users can view and update their profile information.
- Responsive design: The application is optimized for different screen sizes and devices.

## Technologies Used

- React.js: Frontend JavaScript library for building user interfaces.
- Apollo Client: GraphQL client for communication with the server.
- GraphQL: Query language for interacting with the backend API.
- Node.js: JavaScript runtime environment for running the server.
- Express.js: Web application framework for building the server.
- MongoDB: NoSQL database for storing task and user data.
- Stripe: Payment processing platform for handling donations.
- CSS Modules: CSS styling approach for modular and scoped styles.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/mytasks.git`
2. Navigate to the project directory: `cd mytasks`
3. Install dependencies: `npm install`
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the necessary environment variables, such as MongoDB connection details and Stripe API keys. Refer to the `.env.example` file for the required variables.
5. Start the development server: `npm start`
6. Open your browser and visit `http://localhost:3000` to access the application.

## Deployment

To deploy the application to a production environment, follow these steps:

1. Build the production-ready bundle: `npm run build`
2. Configure your server to serve the built files located in the `build` directory.
3. Set the appropriate environment variables in your server environment or hosting platform.
4. Start your server, and the application will be accessible at the specified domain or URL.

## Contributing

Contributions to MyTasks are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue on the GitHub repository.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgements

- This project was developed as part of a coding bootcamp.
- Special thanks to the instructors and mentors for their guidance and support.
