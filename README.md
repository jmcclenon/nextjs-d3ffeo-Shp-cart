# nextjs-d3ffeo-Shp-cart

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/nextjs-d3ffeo)

To start the Shopping Cart Next.js app on a Node.js server without Docker, you can follow these steps:

    Make sure you have Node.js and npm installed on your server.

    Copy the entire shopping-cart directory to your server.

    Navigate to the shopping-cart directory in your terminal:

cd shopping-cart

Install the app's dependencies using npm:

npm install

Start the app in production mode:

npm run build
npm start

This will build the app for production and start the server on port 3000 by default.

Open a web browser and navigate to http://localhost:3000 to view the app.

If you want to run the app in development mode instead of production mode, use the dev script instead of build and start:

npm run dev

This will start the app in development mode with hot module reloading, which allows you to see changes to the app code immediately as you make them.

Note: Make sure to set the necessary environment variables in the .env or .env.local file within the app before running the app. You can customize the app port by setting the PORT environment variable to a different value (e.g. PORT=8080 npm start).

RUN IN DOCKER

Running this app in a Docker container:

Create a Dockerfile in the root directory of your Next.js project:

Dockerfile

# Use Node.js 14 as the base image
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app for production
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

This Dockerfile uses the official Node.js 14 base image and installs the app dependencies, copies the app source code into the container, builds the app for production, and exposes the app port (3000) and starts the app.

Build the Docker image using the Dockerfile:

docker build -t shopping-cart-app .

This command builds the Docker image using the Dockerfile in the current directory and tags it with the name shopping-cart-app.

Start a Docker container from the image:

docker run -p 3000:3000 -d shopping-cart-app

This command starts a Docker container from the shopping-cart-app image and maps the app's port 3000 to the host machine's port 3000. The -d flag runs the container in detached mode, meaning the container runs in the background.

Open a web browser and navigate to http://localhost:3000 to view the app.

That's it! Your app should now be running in a Docker container. If you need to make changes to the app code, you can rebuild the Docker image and start a new container to reflect those changes.

Note: Make sure to set the necessary environment variables in the .env or .env.local file within the app before building the Docker image. You can pass environment variables to the Docker container using the -e flag in the docker run command.
