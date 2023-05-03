# Caring Guide Client

## Folder Structure
The main project folder (<project_root>) can contain the following files:

* **Dockefile** - Used to build the Docker image for the client.

* **.dockerignore** - Used to ignore files when building the Docker image.

* **.gitignore** - Used to ignore files when pushing to GitHub.

* **package.json** - Contains the list of Node packages the system installs when building the Node files.

* **package-lock.json** - Contains metadata about the project and also the functional dependencies that is required by the application. 

* **tailwind.config.js** - Contains the configuration for Tailwind CSS.

* **tsconfig.json** - Contains the configuration for TypeScript.

* **next.config.js** - Contains the configuration for Next.js.

* **src/** - Contains the source code for the client.

* **public/** - Contains the public files for the client.

* **.next/** - Contains the build files for the client.

* **postcss.config.js** - Contains the configuration for PostCSS.

## Run the stack
Make sure you have npm installed. Once you have it installed, you can do the below steps to run the site. 
```sh
$ npm install
$ npm run dev
```