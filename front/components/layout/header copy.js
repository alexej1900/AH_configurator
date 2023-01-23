import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useState, useEffect, useLayoutEffect } from 'react';

import { useQuery } from '@apollo/client';
import { mainSettings } from '../../gql/index';

import { changeMenuState, setRooms , setBrandSettings} from '../../redux/actions/index';
import { useSelector, useDispatch } from 'react-redux';

import checkIsStylePageExist from '../../pages/api/checkIsStylePageExist';
import setVariables from '../../utils/setVariables';

import Fade from 'react-reveal/Fade';

import style from './header.module.scss';
import getSettings from '../../pages/api/getSettings';

export default function Header () {
  console.log('HEADER')
  const [isStylePageExist, setIStylePageExist] = useState(false);
  const [menuSize, setMenuSize] = useState({listSize: 0, wrapperSize: 0});

  const [shift, setShift] = useState(0);
  const [shiftSize, setShiftSize] = useState(0);
  const [roomsList, setRoomsList] = useState([]);

  const checkStylePage = checkIsStylePageExist();
  const settings = getSettings();
  console.log('Settings')
  const dispatch = useDispatch();
  console.log('dispatch')

  const { asPath, query } = useRouter();
  
  // const { menu, open, logo, headerImage, headerBg, rooms } = useSelector((state) => state.generalStates);
  const menu = useSelector((state) => state.generalStates.menu);
  const open = useSelector((state) => state.generalStates.open);
  const logo = useSelector((state) => state.generalStates.logo);
  const headerImage = useSelector((state) => state.generalStates.headerImage);
  const headerBg = useSelector((state) => state.generalStates.headerBg);
  const rooms = useSelector((state) => state.generalStates.rooms);


// console.log('stateRooms', rooms)
  useEffect(() => {
    checkStylePage.then((isExist) => {
      setIStylePageExist(isExist)
    });
    
  }, [checkStylePage]);

  // if (rooms) dispatch(setRooms(rooms));

  // useEffect(() => {
  //   updateSize();
  // },[]);

//   useEffect(() => {
//     if(settings)
//     settings.then((settings) => {
//       // dispatch(setRooms(pesp.rooms))
//       // setVariables(settings);
//       const logo = settings?.brandLogo[0].url;
//       const headerBgPicture = settings?.headerBackgroundPicture[0] ? settings?.headerBackgroundPicture[0].url : false;
//       const headerBg = settings?.headerBackgroundColor;
// console.log('settings', settings)
//       // dispatch(setBrandSettings(logo, headerBgPicture, headerBg));
//       // pageBg = settings?.welcomePageBg ? settings.welcomePageBg : '';
//     })
//   }, [settings]);

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Comparing width of list with rooms and wisible wrapper. If width of list > than width of wrapper will appears button
  const updateSize = () => {  

    const listWrapper = document.getElementById('listWrapper');
    const menuList = document.getElementById('menuList');
    setMenuSize({
      listSize : menuList?.offsetWidth, 
      wrapperSize : listWrapper?.offsetWidth
    })
    window.innerWidth <= 1300 && setShift(0);
  }

  const closeMenuHandler = () => dispatch(changeMenuState(!menu));

  const background = headerImage ? `no-repeat url("${headerImage}")` : `${headerBg}`;

  const moveRightClickHandler = () => {
    (shift < 10 && shift < roomsList.length) && setShift(++shift);
    setShiftSize((50 / roomsList.length) * shift); //shifting of menu list should be not more than 50%
  }
  
  const moveLeftClickHandler = () => {
    shift > 0 && setShift(--shift);
    setShiftSize((50 / roomsList.length) * shift); 
  }

  const openStyle = menu ? {background: background, backgroundSize: "100%"} : {background: 'transparent'};

  return (
    <header 
      className={[style.header, open & asPath !== '/' && style.compressed].join(' ')} 
      style={openStyle}
    >

      <div className={style.header__wrapper}>
        {logo && 
          <Link href='/'>
            <div className={style.logo}>
              <Image src={logo} height={'30px'} width={'150px'} layout="fixed" alt="Logo"/>
            </div>
          </Link>
        }

        <div className={style.menu}>
          <div className={style.menu__item}>
            <img 
              src={menu ? "/close.svg" : "/hamburger.svg"} 
              width="24" 
              height="24" 
              className={style.menu__open} 
              onClick={() => closeMenuHandler()}
              alt="Menu"
            />
          </div>
          {asPath !== '/' && asPath !== '/summary' &&
            <Link href='/summary'>
              <a className={`${style.finish}`} title="To the summary page">
                <img src='./summaryList.svg' alt="summary" />
                <span className={`${style.finish__btn_descr}`}>Fertigstellen</span>
              </a>
            </Link> 
          } 

          {asPath !== '/' &&
            <Link href='https://www.nightnurse.ch/share/22G09%20Calydo/221102/'>
              <a className={`${style.virtual}`} title="To the virtual tour" target="_blank">
                <img src='./virtual.svg' alt="virtual" />
              </a>
            </Link> 
          }     
        </div>
      </div>

      {menu &&
        <Fade duration={150} top className={style.header__menu_block} >
          <div className={style.header__menu} id='listWrapper'>
            <div className={style.header__menu__wrapper} >
              <ul className={style.header__menu__list} id='menuList'>
          
                {shift > 0 && 
                  <div className={`${style.moveLeftButton}`} onClick={moveLeftClickHandler}> 
                    <img src="/arrowRight.svg"/> 
                  </div>
                }

                <div className={style.header__menu__internalList}>
                  <div className={`${style.header__menu__internalList_wrapper} `} style={{transform: `translateX(-${shiftSize}%)`}}>
                    
                    <Link activeClassName='active' exact={true} href='/'>
                      <a className={`${asPath === '/' ? style.active : ''} ${style.welcomeItem}`} onClick={() => closeMenuHandler()}>Grundrisse</a>
                    </Link>

                    {isStylePageExist && 
                      <Link href='/type'>
                        <a className={`${asPath === '/type' ? style.active : ''} ${style.typeItem}`} onClick={() => closeMenuHandler()}>Interieurstil</a>
                      </Link>
                    }

                    {roomsList.map((room) => {
                  
                        const currentRoom = `/${room.toLowerCase()}`;
                        return (
                        <Link href={currentRoom} key={room}>
                          <a className={`${query.room === currentRoom.slice(1) ? style.active : ''} ${style.roomItem}`} onClick={() => closeMenuHandler()}>{room}</a>
                        </Link>
                        )
                    })}
                    </div>
                  </div>
                </ul>
              </div>

              {menuSize.listSize > menuSize.wrapperSize && //Button appears if the list of rooms longer than the wrapper
                <div className={`${style.moveRightButton}`} onClick={moveRightClickHandler}> 
                  <img src="/arrowRight.svg"/> 
                </div>
              }
              
            </div>
          </Fade>
        }
    </header>
  )
}
