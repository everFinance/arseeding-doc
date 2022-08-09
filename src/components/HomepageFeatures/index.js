import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate from "@docusaurus/Translate";
import Link from "@docusaurus/Link";

const FeatureList = [
    {
        title: <Translate>Guide</Translate>,
        to: 'docs/guide/detail',
        src: require('../../../static/img/guide.png').default,
    },
    {
        title: <Translate>Deploy</Translate>,
        to: 'docs/deploy/intro',
        src: require('../../../static/img/deploy.png').default,
    },
    {
        title: 'SDK',
        to: 'docs/sdk/arseeding-go/intro',
        src: require('../../../static/img/sdk.png').default,
    },
];

// function Feature({Svg, title, description}) {
//   return (
//     <div className={clsx('col col--4')}>
//       <div className="text--center">
//         <Svg className={styles.featureSvg} role="img" />
//       </div>
//       <div className="text--center padding-horiz--md">
//         <h3>{title}</h3>
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// }
function Feature({src, title, to}) {
    return (
        <Link className={clsx('col', styles.link)} to={to}>
            <div className="text--center">
                <img className={styles.featureSvg} alt={title} src={src} />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
            </div>
        </Link>
    );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
