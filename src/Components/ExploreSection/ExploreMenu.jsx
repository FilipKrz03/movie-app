import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import classes from "./ExploreMenu.module.scss";
import { useCallback } from "react";

const ExploreMenu = props => {

  const [activeList, setActiveList] = useState("akcja");

  const activeHandler = useCallback((event) => {


    setActiveList(event.target.id);
   
    let categoryId;
    if(event.target.id === 'akcja'){
        categoryId = 28;
    }
    if(event.target.id === 'romantyczne'){
        categoryId = 10749;
    }
    if(event.target.id === 'scfi'){
        categoryId = 878;
    }
    if(event.target.id === 'horror'){
        categoryId = 27;
    }
    if(event.target.id === 'wojenne'){
        categoryId = 10752;
    }
    props.onNewCategory(categoryId);

  } , [props]);

  return (
    <nav className={classes.nav} id="explore">
      <TypeAnimation
      className={classes.typed} 
      sequence={[
       'Odkrywaj Filmy' , 
       2000 , 
        'Znajdz cos nowego' , 
        2000 , 
        'Znajdz cos nowego , dla ' ,
        500 ,
        'Znajdz cos nowego' , 
        'Znajdz cos nowego , dla siebie !' , 
        10000
      ]}
      cursor = {true}
      repeat={Infinity}
      />
      <ul>
        <li
          id="akcja"
          onClick={activeHandler}
          className={'akcja' === activeList ? classes.active : ''}
        >
          Akcja
        </li>
        <li
          id="romantyczne"
          onClick={activeHandler}
          className={"romantyczne" === activeList ? classes.active : ''}
        >
          Romantyczne
        </li>
        <li
          id="scfi"
          onClick={activeHandler}
          className={"scfi" === activeList ? classes.active : ""}
        >
          Sc-Fi
        </li>
        <li
          id="horror"
          onClick={activeHandler}
          className={"horror" === activeList ? classes.active : ""}
        >
          Horror
        </li>
        <li
          id="wojenne"
          onClick={activeHandler}
          className={"wojenne" === activeList ? classes.active : ""}
        >
          Wojenne
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(ExploreMenu);
