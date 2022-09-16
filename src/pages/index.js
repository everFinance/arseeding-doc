import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import HomepageFeatures from "../components/HomepageFeatures";
import Translate from "@docusaurus/Translate";
import PartnerFeatures from "../components/PartnerFeatures";

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  console.log(siteConfig)
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles.container}>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className={styles.web3infraDes}><Translate>The Web3Infra tool has you developers covered. It's Easy-to-use, has high-performing Arweave light nodes and gateways. Making it as easy as "copy-paste" when building on Web3.
        </Translate></p>
        <div className={styles.buttons}>
          <Link
            className={styles.btnName}
            to="/docs/Arseeding/guide/quickStart">
            <Translate>Quick Start</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="The Web3Infra tool has you developers covered. It's Easy-to-use, has high-performing Arweave light nodes and gateways.">
      <HomepageHeader />
      <main>
          <HomepageFeatures/>
          <PartnerFeatures/>
      </main>
    </Layout>
  );
}
