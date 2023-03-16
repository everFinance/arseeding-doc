// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion


const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Web3Infra',
  // tagline: '开发者文档',
  url: 'https://web3infra.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'everFinance', // Usually your GitHub org/user name.
  projectName: 'arseeding-doc', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-cn'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
      },
      'zh-cn': {
        label: '简体中文',
        direction: 'ltr',
      },
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Home',
        logo: {
          alt: 'Site home',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'arseeding/introduction/lightNode',
            position: 'left',
            label: 'Arseeding',
          },
          {
            type: 'doc',
            docId: 'goar/introduction/intro',
            position: 'left',
            label: 'Goar',
          },
          {
            type: 'doc',
            docId: 'arsyncer/introduction/intro',
            position: 'left',
            label: 'Arsyncer',
          },
          {
            type: 'doc',
            docId: 'turing/introduction/intro',
            position: 'left',
            label: 'Turing',
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/permadao/arseeding',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Arseeding',
                to: '/docs/arseeding/introduction/lightNode',
              },
              {
                label: 'Goar',
                to: '/docs/goar/introduction/intro',
              },
              {
                label: 'Arsyncer',
                to: '/docs/arsyncer/introduction/intro',
              },
              {
                label: 'Turing',
                to: '/docs/turing/introduction/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              // {
              //   label: 'Stack Overflow',
              //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              // },
              {
                label: 'Discord',
                href: 'https://discord.com/invite/WM5MQZGVPF',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/everVisionHQ',
              },
                // add
              {
                label: 'Medium',
                href: 'https://news.ever.vision',
              },
              {
                label: 'PermaDAO',
                href: 'https://permadao.com',
              },
            ],
          },
          {
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'GitHub',
                href: 'https://github.com/permadao/arseeding',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} everVision, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      metadata: [
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:site', content: '@everVisionHQ'},
        {name:'twitter:title', content: 'Web3Infra'},
        {name:'twitter:description', content: 'The Web3Infra tool has you developers covered. It\'s Easy-to-use, has high-performing Arweave light nodes and gateways.'},
        {name: 'twitter:image', content: 'https://arseed.web3infra.dev/37V04B8otZHoNSIJ8QTiZp38fN1Uo60rNQ9bSI-GQWA'},
          //https://arseed.web3infra.dev/37V04B8otZHoNSIJ8QTiZp38fN1Uo60rNQ9bSI-GQWA
        {property: 'og:image', content: 'https://arseed.web3infra.dev/37V04B8otZHoNSIJ8QTiZp38fN1Uo60rNQ9bSI-GQWA'},
        {property: 'og:type', content: 'website'},
        {property: 'og:title', content: 'Web3Infra'},
      ],
    }),
};

module.exports = config;
