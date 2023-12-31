# (No longer maintained) E3 Stack - The best way to start a typesafe backend

A powerful tech stack for building robust and scalable APIs using TypeScript, Express.js, and optionally Prisma, along with minor dependencies like Zod, ESLint, and Prettier.

## Introduction

Welcome to the E3 Stack - the best way to start a typesafe backend! This tech stack provides you with everything you need to create APIs quickly and efficiently. It's designed to simplify the development process and make your life easier.

## Features

- **TypeScript**: Write code that's easy to understand and maintain thanks to strong typing.
- **Express.js**: Build APIs that are fast, reliable, and easy to scale using Node.js and Express.
- **Prisma**: Simplify database operations with an auto-generated query builder and type-safe schema.
- **Zod**: A runtime type checking library to ensure data consistency.
- **ESLint**: Lint your code for best practices and maintainability.
- **Prettier**: Automatically format your code to keep it clean and consistent.

## Getting Started

To create your API project with the E3 Stack, you only need one simple command:

```bash
npm create e3-app@latest
```

or

```bash
yarn create e3-app
```

or

```bash
pnpm create e3-app@latest
```

or

```bash
bunx create-e3-app@latest
```

This command will set up a new project based on the E3 Stack. Follow the prompts to customize your project as needed, including the option to include Prisma, and you're ready to go!

## Project Structure

The project structure is organized as follows:

- `src/`: Contains the core source code for your TypeScript and Express.js application.
  - `controllers/`: This directory holds your API controller logic.
  - `routes/`: Define your API routes here.
  - `lib/`: Store utility functions or shared code in this directory.
  - `index.ts`: The entry point of your application, where the Express.js server is initialized.
- `public/`: If you have static assets such as images, place them in this directory.
- `prisma/`: Prisma schema files and database migration configurations are stored here.
- `.env`: Configuration file for environment variables, including database connection details (if applicable).

Feel free to adapt this structure to match your specific project requirements.

## Contributing (will add soon)

Contributions are always welcome! If you'd like to make improvements or fix issues in the E3 Stack, please follow the contribution guidelines.

## License

The E3 Stack is released under the [MIT License](LICENSE).

Start building powerful APIs with the E3 Stack, the best way to start a typesafe backend! 🚀
