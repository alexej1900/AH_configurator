import {formatNumber} from '../../utils/utilities';
import styles from './optionsList.module.scss';

export default function OptionItem ({
    data, 
    index,
    activeOption,
    modificationName,
    changeOption,
    final
}) {

  const {optionsTitle, optionsPrice, optionsSubtitle } = data;

  return (
    <div  className={`${styles.radio}  ${final && styles.final}`}>
      <div className="row">
          <div className={`col-2 ${styles.option__input}`} >
              <input 
                type="radio" 
                id={index} 
                name={modificationName}  
                onChange={() => changeOption(index, optionsTitle, optionsSubtitle, formatNumber(optionsPrice) !== 'NaN' ? optionsPrice : 0)}
                checked={activeOption === index} 
              />
          </div>
          <div className={`col-6 ${styles.option__description}`}>
              <label htmlFor={index} className={styles.option__size}>{optionsTitle}</label>
              <h5> {optionsSubtitle} </h5>
          </div>
          <div className={`col-4 ${styles.option__price}`}>
              {optionsPrice &&                     
                  <span className={styles.price}>
                    {formatNumber(optionsPrice) !== 'NaN' ? `CHF + ${formatNumber(optionsPrice)}` : optionsPrice}
                  </span>
              }
          </div>
      </div>
    </div>
  )
}
