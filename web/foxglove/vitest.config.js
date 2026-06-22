import { defineConfig } from 'vitest/config'

// Self-contained test config for the Foxglove storefront.
//
// Without a config file here, Vitest walks UP the directory tree and loads the
// tide-now app's `web/vite.config.js`, which imports `vite` + `@vitejs/plugin-react`
// — packages that are NOT installed in this storefront's isolated `node_modules`
// (its only devDependency is `vitest`). In CI the `Foxglove unit tests` job runs
// `npm ci` in `web/foxglove` only, so `web/node_modules` does not exist and loading
// the parent config fails with `ERR_MODULE_NOT_FOUND: Cannot find package 'vite'`.
// (It passes locally only when `web/node_modules` happens to be installed too.)
//
// This config stops that upward walk. The storefront tests exercise pure JS modules
// (`createBasketStore`, `validateEmail`, `formatMoney`) with no DOM, so Vitest's
// default `node` environment is correct.
export default defineConfig({
  test: {
    root: '.',
    environment: 'node',
    include: ['tests/**/*.test.js'],
  },
})
