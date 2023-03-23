import Link from 'next/link';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import { changeMenuState } from "../../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";

import ContactForm from '../ui/contactForm';
import IconComponent from '../ui/atoms/iconComponent';

import style from './header.module.scss';

export default function Header () {

  const [shift, setShift] = useState(true);
  const [isPopup, setIsPopup] = useState(false);

  const dispatch = useDispatch();
  const { pathname, query } = useRouter();

  const generalStates = useSelector((state) => state.generalStates);
  const apartSize = useSelector((state) => state.apartSize);

  const { menu, open }  = generalStates;
  const rooms = [
    'Wohnzimmer', 
    'Raumtrenner', 
    'Küchenlinien', 
    `${apartSize.roomsCount > 2.5 ? 'Badezimmer' : ''}`, 
    'Dusche', 
    'Schlafzimmer', 
    'Gang'
  ];

  useEffect(() => {
    checkSize();
  }, []);

  const checkSize = () => {  // Comparing height of wisible part of menu with window height
    const menuBlock = document.getElementById('menuBlock');
    if (menuBlock) {
      const isMenuAtBotton =  Math.abs(menuBlock.scrollHeight - menuBlock.clientHeight - menuBlock.scrollTop) < 1
      window.innerHeight < menuBlock.scrollHeight && !isMenuAtBotton ? setShift(true) : setShift(false);
    }
  }

  const closeMenuHandler = () => dispatch(changeMenuState(!menu));

  const onCancel = () => setIsPopup(false);

  return (
    <header className={[style.header, open & pathname !== '/' && style.compressed, (pathname === '/'|| pathname === '/summary') && style.shifted, menu && style.background].join(' ')}>
      <div className={style.header__wrapper}>
        <Link href={`/?id=${apartSize.apartmentId}`}>
          <img className={style.logo} src={'./AH_Header_Logo.svg'} alt="Logo"/>
        </Link>

        <div className={style.header__buttons}>
          {pathname !== '/' &&
            <Link href='https://www.nightnurse.ch/share/22G09_Calydo/230206s'>
              <a className={`${style.header__buttons_virtual}`} title="To the virtual tour" target="_blank">
                <IconComponent name="virtual" color="#3C6589"/>
              </a>
            </Link> 
          } 

          <div className={style.header__buttons_open} onClick={() => closeMenuHandler()}>
            <IconComponent name={menu ? "close" : "hamburger"} color="#3C6589"/>
          </div>
        </div>
      </div>
        <div className={`${style.header__menu} ${menu && style.header__menu_open}`} id='menuBlock' onScroll={checkSize}>
          <ul className={style.header__menu__list} id='menuList' >
            <Link activeClassName='active' exact={true} href={`/?id=${apartSize.apartmentId}`}>
              <a className={`${pathname === `/` ? style.active : ''} ${style.roomItem} ${style.welcomeItem}`} onClick={() => closeMenuHandler()}>Grundrisse</a>
            </Link>

            {rooms?.map((room) => {
          
              if (room) {
                const currentRoom = `/${room.toLowerCase() !== 'küchenlinien' ? room.toLowerCase() : 'kitchen-type'}`;
                return (
                  <Link href={currentRoom} key={room}>
                    <a className={`${query.room === currentRoom.slice(1) ? style.active : ''} ${style.roomItem}`} onClick={() => closeMenuHandler()}>{room}</a>
                  </Link>
                )}
            })}
          </ul>

          <div className={`${style.header__menu_button_block}`}>
            {pathname !== '/' && pathname !== '/summary' &&
              <Link href='/summary'>
                <a className={`${style.header__menu_button} ${style.header__menu_button_summary}`} onClick={() => closeMenuHandler()} title="To the summary page">
                  <IconComponent name="summary" color="#3C6589"/>
                  <span className={`${style.header__menu_button_descr}`}>Konfiguration fertigstellen</span>
                </a>
              </Link> 
            } 

            <a className={`${style.header__menu_button} ${style.header__menu_button_contact}`} 
              title="To get contact" 
              onClick={() => setIsPopup(true)}
            >
              <IconComponent name="person" color="#fff"/>
              <span className={`${style.header__menu_button_descr}`}>Kontakt aufnehmen</span>
            </a>

            <div className={`${style.header__menu_button_devider}`}></div>

            <a className={`${style.header__menu_button} ${style.header__menu_button_back}`} 
              title="Back to Appenzeller Huus Website" 
              href='https://appenzellerhuus-wohnen.ch/'
            >
              <IconComponent name="globe" color="#3C6589"/>
              <span className={`${style.header__menu_button_descr}`}>Zurück zur Appenzeller Huus Website</span>
            </a>

            <div className={`${style.header__menu_button_devider}`}></div>

          </div>
          {shift 
            ? <div className={`${style.header__menu_button_down}`}></div>
            : null 
          } 
        </div>
      {isPopup && <ContactForm onCancel={onCancel}/>}
    </header>
  )
}
