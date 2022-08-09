# Arseeding

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start // default en
$ yarn start -- --locale zh-cn // run with cn
```


This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### i18n
*copy doc and translate label:*
```bash
mkdir -p i18n/zh-cn/docusaurus-plugin-content-docs/current
cp -r docs/** i18n/zh-cn/docusaurus-plugin-content-docs/current
npm run write-translations -- --locale zh-cn
```
### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
