THERE IS A QA AND MAIN BRANCH, BOTH BRANCHES HAVE THEIR PIPELINES, SO WHEN YOU MAKE CHANGES AND PUSH TO QA, YOU CAN ACCESS IT VIA THE LINK BELOW, THE SAME FOR THE MAIN BRANCH. THE MAIN BRANCH IS THE PRODUCTION BRANCH THAT WOULD BE SHARED PUBLICLY, SO UNCERTAIN CHANGES SHOULD GO TO QA FIRST. TO TEST THESE UNCERTAIN CHANGES, USE THE URL. THERE SHOULD BE NO CONFUSION ON NOT SEEING YOUR UPDATES AFTER DEPLOYMENT IF YOU PUSHED TO A DIFFERENT BRANCH.

QA SERVICE URL: https://langeasy-frontend-qa-tk7ash3eaa-uc.a.run.app

Prod Serice url: https://langeasy-frontend-tk7ash3eaa-uc.a.run.app --- www.langeasy.ai


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
