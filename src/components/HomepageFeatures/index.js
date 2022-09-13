import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate from "@docusaurus/Translate";
import Link from "@docusaurus/Link";

const FeatureList = [
    {
        title: <Translate>Guide</Translate>,
        to: 'docs/arseeding/guide/detail',
        src: require('../../../static/img/guide.png').default,
    },
    {
        title: <Translate>Deploy</Translate>,
        to: 'docs/arseeding/deploy/intro',
        src: require('../../../static/img/deploy.png').default,
    },
    {
        title: 'SDK',
        to: 'docs/arseeding/sdk/arseeding-go/intro',
        src: require('../../../static/img/sdk.png').default,
    },
];

function Feature({src, title, to}) {
    return (
        <Link className={styles.link} to={to}>
            <div className="text--center">
                <img className={styles.featureSvg} alt={title} src={src} />
            </div>
            <div>
                <h3 className={styles.textLink}>{title}</h3>
            </div>
        </Link>
    );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.row}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
