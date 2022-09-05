# Visited Links Marker

## Description

### What does it do?

1. Visited Links Marker changes the color of the link that you have previously visited according to your browser history
2. you can choose any color
3. you can choose which websites the extension will run on

### Why is it useful?

- If you read blogs, do research, watch videos etc., you will immediately see any articles or videos you have previously clicked on. So you don't have to consume them again.
- It will be easier to navigate the website because the links you often click on will be a different color so you'll see them immediately.

### Development notes

- If you find a bug or have an idea for an improvement, I'd love to hear your recommendations. This is the first version and I want to improve it gradually.
- If you'd like to contribute to this repository, feel free, just fork the project and make a pull request.

## Getting Started

1. `npm i` to install dependancies
2. `npm start` to start running the fast development mode Webpack build process that bundle files into the `dist` folder
3. `npm i --save-dev <package_name>` to install new packages
4. `npm run build` to generate a minimized production build in the `dist` folder

### Loading The Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Toggle on `Developer mode` in the top right corner
3. Click `Load unpacked`
4. Select the entire `dist` folder
