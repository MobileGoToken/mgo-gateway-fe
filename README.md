This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). It is recommended to familiarize with their documentation if you haven't so far.  

## Table of Contents

- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [yarn start](#yarn-start)
  - [yarn run build](#yarn-run-build)
  - [yarn test](#yarn-test)
  - [yarn run format-js](#yarn-run-format-js)
  - [yarn run format-scss](#yarn-run-format-scss)
  - [yarn run format](#yarn-run-format)
  - [yarn run lint](#yarn-run-lint)
  - [yarn run lint-prod](#yarn-run-lint-prod)
  - [yarn run lint-fix](#yarn-run-lint-fix)
  - [yarn run lint-styles](#yarn-run-lint-styles)
- [Libraries used](#libraries-used)  
- [Code Quality](#code-quality)  
  - [Linting](#linting)       
  - [Formatting](#formatting)
  - [Git hooks](#git-hooks)
- [Contribution](#contribution)  

## Folder Structure

```
my-app/
  README.md
  node_modules/
  package.json
  public/
  src/
   assets/
    images/
    styles/ 
  components/
  constants/
  state/
  x
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `yarn run build`

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn run format-js`

Formats `js` code. 

### `yarn run format-scss`

Formats `scss` code. 

### `yarn run format`

Runs both [yarn run format-js](#yarn-run-format-js) and [yarn run format-scss](#yarn-run-format-scss).

### `yarn run lint`

Run ESLint in "dev" mode, meaning errors will be displayed in the console but app wont break.  

### `yarn run lint-prod`

Run ESLint in "prod" mode. Called on `git push`.

### `yarn run lint-fix`

Run ESLint while fixing problems in the code that are automatically fixable.

### `yarn run lint-styles`

Run ESLint on `scss` files. 

# Libraries used

Most notables libraries used are:  
- [React](https://reactjs.org/) - obviously :) 
- [Redux](https://redux.js.org/) - for state management
- [Redux-Saga](https://redux.js.org/) - for handling side effects (mostly for data fetching) 
- [React Router](https://reacttraining.com/react-router/web/guides/philosophy) - for routing
- [Flow](https://flow.org/) - for static type checking

# Code Quality

## Linting 

Linting is done using [ESLint](https://eslint.org/) using slightly modified [Airbnb's config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).

## Formatting

Automatic formatting is done using [Prettier](https://github.com/prettier/prettier) by calling `yarn run format` script or by triggering committing changes to the local repository. 

## Git hooks

To maintain code quality, git hooks are set-up to trigger [lint](#linting) and [format](#formatting) scripts on `git commit` and `git push`.    
 
### Pre-commit 

This hook triggers on `git commit` and run `yarn run format`. 

### Pre-push 

This hook triggers on `git push`, runs lint and test scripts and cancels the push if any of these breaks. 

## Contribution

Use [Git FLow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) workflow but, prefix feature branches with your initial instead  of `feature`. 
So naming pattern for feature branches should be`<youe_initials>/<jira_task_id>`.
Example: `MS/EC-33`

Please follow ["How to Write a Git Commit Message"](https://chris.beams.io/posts/git-commit/)
recommendations when writing commit messages.

When development is done create a PR and wait for code review. After PR is approved, merge your branch.