# Project intro
Budgeteer is a personal finance tracker app that <b>we developed for ourselves and all our friends</b> that are willing to get summarized statistics based on their income and expenses and understand the spending habits. 

## Key functionality
The app allows to go through the<b> whole flow of the personal finances tracking</b>: <br>
<li> Authentificating with Telegram to create an account </li>
<li>Adding an income transaction and a tag</li>
<li>Adding a spend transaction and a tag</li>
<li>Viewing spending breakdown based on the tags (categories)</li>
<li>Viewing financial health rate (based on the spending to income ratio) </li>
<li>Viewing spending frequency </li>
<li>Viewing bills and subscriptions and automatically add them on to the monthly breakdown </li>

## TWA development potential
There's a great potential for the mini app development in the following directions:
<li>User wallets/cards integration</li>
<li>Advanced statistics</li>
<li>Inline commands integration for a quick transaction adding process</li>
<br>
We envision that the TWAs will become organic and familiar for the users and such a use case will showcase a real-world daily usage of the TWAs.

# Third-party integrations 
For the mini app development we used a couple of different integrations to support the PoC.

## Data visualisation
For data visualisation we used a
<li><a href="https://d3js.org/"> D3 by Observable</a> </li>

## UI Implementation
<li>For the date picker we implemented a react-ios-picker</a>, </li>
<li>the emoji picker is from <a href="https://github.com/ealush/emoji-picker-react"> ealush's library </a>, </li>
<li> Animations are done with the help of <a href="https://www.react-spring.dev/"> React Spring</a></li>
<li><a href="https://keen-slider.io/">Keen Slider</a> was a library for sliders</li>

# Set up
## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
