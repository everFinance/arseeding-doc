import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from "@docusaurus/Link";


const PartnerList = [
    [
        {
            to: 'https://everpay.io',
            src: require('../../../static/img/everpay.png').default,
        },
        {
            to: 'https://permaswap.network/#/',
            src: require('../../../static/img/perma.png').default,
        },
        {
            to: 'https://www.ethsign.xyz/',
            src: require('../../../static/img/ethsig.png').default,
        },
        {
            to:'https://relationlabs.ai/#/home',
            src: require('../../../static/img/relation.png').default,
        },
    ],
    [
        {
            to: 'https://www.4everland.org/',
            src: require('../../../static/img/4ever.png').default,
        },
        {
            to: 'https://metaforo.io/',
            src: require('../../../static/img/metaforo.png').default,
        },
        {
            to: 'https://showme.fan/',
            src: require('../../../static/img/showme.png').default,
        },
        {
            to: 'https://quest3.xyz/',
            src: require('../../../static/img/quest3.png').default,
        },
    ]
]

function Partner({src, to}) {
    return (
        <Link className={clsx('col', styles.link)} to={to}>
            <img className={styles.partnerSvg}  src={src}  alt={"."}/>
        </Link>
    );
}

export default function PartnerFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.usedBy}>
            <h2>Used By & Supported</h2>
        </div>
        <div className="row">
          {PartnerList[0].map((props, idx) => (
              <Partner key={idx} {...props} />
          ))}
        </div>
        <div className="row">
          {PartnerList[1].map((props, idx) => (
              <Partner key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
