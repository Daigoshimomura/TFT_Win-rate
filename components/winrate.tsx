import Reack from 'react';
import styles from './winrate.module.css';
import Single from './winrate_single';
import { SingleRetrieve } from '../util/retrieveData';

//galaxies画面のチャンピオン表示

type Props = {
  singleRetrieve: SingleRetrieve[];
};

const Winrate: React.FC<Props> = ({ singleRetrieve }) => {
  return (
    <div className={styles.winrate}>
      <Single singleRetrieve={singleRetrieve} />
    </div>
  );
};

export default Winrate;
