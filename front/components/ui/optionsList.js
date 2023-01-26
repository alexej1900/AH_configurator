import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux'

import { changeRoomTypeOption } from '../../redux/actions/index';
import OptionItem from './Components/optionItem';

import styles from './optionsList.module.scss';

export default function OptionsList ({
    data,
    modificationName,
    selectCard,
    inLine,
    onlyIndividual,
    activeFormat
  }) {

  const router = useRouter();
  const room = router.asPath.slice(1);

  const [activeOption, setActiveOption] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveOption(activeFormat)
  }, [activeFormat])

  const changeOption = (index, optionsTitle, optionsSubtitle, price) => {
    setActiveOption(index);
    selectCard(price);
    dispatch(changeRoomTypeOption(room, modificationName, index, optionsTitle, optionsSubtitle, price));
  }

  return (
    <div className={`${styles.optionWrapper} ${inLine | onlyIndividual && styles.collapsed}`}>
      <div className={`${styles.optionHeader}`}>
        {/* <div 
          // className={`${styles.arrow} ${collapsed && styles.rotate}`} 
          // onClick={() => setCollapsed(!collapsed)}
        >
        </div> */}
        <h4 className={`${styles.optionTitle}`}>Format</h4>
      </div>
      <div className={`${styles.optionsList}  ${collapsed && styles.collapsed}`}>
        {data.map((item, index) => {

          return (
            <OptionItem 
              key={index}
              data={item} 
              index={index} 
              activeOption={activeOption} 
              changeOption={changeOption}
              modificationName={modificationName}
            />
            )
          }) 
        }
      </div>
    </div>
  )
}
