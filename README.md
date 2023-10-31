
# Image Vectorization Automation

This tool automates the process of converting regular images to vector images using [vectorizer.ai](https://vectorizer.ai/).

## Pre-requisites

- Node.js
- npm or yarn
- TypeScript

## Dependencies

- [puppeteer-extra](https://www.npmjs.com/package/puppeteer-extra)
- [puppeteer-extra-plugin-stealth](https://www.npmjs.com/package/puppeteer-extra-plugin-stealth)
- [fs](https://nodejs.dev/learn/the-nodejs-fs-module)
- [chalk](https://www.npmjs.com/package/chalk)
- [path](https://nodejs.dev/learn/nodejs-path-module)

## Setup and Usage

1. Clone the repository to your local machine.
2. Install the necessary dependencies with npm or yarn:
```
npm install
```
or
```
yarn install
```
3. Place the images you wish to vectorize inside the `./assets` directory.
4. Run the script using:
```
npx ts-node main.ts
```
1. The vectorized images will be saved in the `./vector_images` directory.

## Important Notes

- The script uses browser emulation to interact with the vectorizer.ai website.
- It's recommended to monitor the process during its execution, as the website structure or behavior might change over time, potentially causing the automation to fail.

## Contributions

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This tool is open-source and free to use. However, make sure to respect the terms of service of [vectorizer.ai](https://vectorizer.ai/).

## Disclaimer

This tool is not affiliated with, endorsed by, or in any way associated with vectorizer.ai. It's a utility script designed for personal convenience.