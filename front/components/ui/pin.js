import { useSelector } from "react-redux";

import EditIcon from './Components/editIcon';
import CheckIcon from './Components/checkIcon';

import styles from './pin.module.scss';

export default function Pin ({ top, left, clickHandle, classes, checked }) {

  const sidebarState = useSelector((state) => state.generalStates.open);

  const leftShift = sidebarState ? +left + 10 : left;

  const leftX = window.innerWidth > 1500 // 1500 = width of big image in px
    ? {left: `calc((100% + 36rem) * ${leftShift/100})`,
        top: `${top}%`} 
    : {left: `calc((1500px * ${(left)/100 + .05})`,
        top: `${top}%`}
        
  const disabledImage = () => {
    return checked 
      ? <CheckIcon color='#fff'/>
      : <EditIcon color='#fff'/>
  };
    
  return (
    <div 
      className={`${styles.pin} ${classes === 'active' && styles.pin__active}`} 
      style={leftX} 
      onClick={()=>clickHandle()}>
      {disabledImage()}
    </div>
  )
}
