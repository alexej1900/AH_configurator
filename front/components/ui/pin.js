
import Image from 'next/image';

import { useSelector } from "react-redux";

import styles from './pin.module.scss';

export default function Pin ({top, left, clickHandle, type, classes, checked, individual}) {

  const { generalStates } = useSelector((state) => state);
  const sidebarState = generalStates.open;

  const leftShift = sidebarState ? +left + 10 : left;

  // const leftX = window.innerWidth > 1500 
  //   ? {left: `calc((100% + 36rem) * ${leftShift/100})`} 
  //   : window.innerWidth > 768
  //     ? {left: `calc((100% + 36rem) * ${leftShift/100} - (1500px - 100vw) / ${left/5}`}
  //     : {left: `calc((1500px * ${(left)/100 + .05})`};

  const leftX = window.innerWidth > 1500 // 1500 = width of big image in px
    ? {left: `calc((100% + 36rem) * ${leftShift/100})`,
        top: `${top}%`} 
    : {left: `calc((1500px * ${(left)/100 + .05})`,
        top: `${top}%`}
        

  const disabledImage = () => {
    return checked 
      ? individual 
        ? <Image width="36" height="48" src={classes === 'active' ? '/individ-pin_green.svg' : '/individ-pin.svg'} alt="Pin"/> 
      
        : <Image width="36" height="48" src={classes === 'active' ? '/check-green.svg' : '/checked.svg'} alt="Pin"/> 
      : classes === 'active' 
        ? <Image width="36" height="48" src={type === 'style' ? '/style_active.svg' : '/edit_active.svg'} alt="Pin"/>
        : <Image width="36" height="48" src={type === 'style' ? '/edit_style.svg' : '/edit.svg'} alt="Pin"/>;
  };
    
  return (
    <div 
    className={`
      ${styles.pin} 
      ${classes}`} 
      style={leftX} 
      onClick={()=>clickHandle()}>
      {disabledImage()}
    </div>
  )
}
