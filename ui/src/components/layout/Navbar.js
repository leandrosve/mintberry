import React, { useState } from "react";
import { NavbarBrand } from "bloomer/lib/components/Navbar/NavbarBrand";
import { Navbar as BulmaNavbar } from "bloomer/lib/components/Navbar/Navbar";
import { NavbarItem } from "bloomer/lib/components/Navbar/NavbarItem";
import { NavbarBurger } from "bloomer/lib/components/Navbar/NavbarBurger";
import { NavbarMenu } from "bloomer/lib/components/Navbar/NavbarMenu";
import { NavbarStart } from "bloomer/lib/components/Navbar/NavbarStart";
import { NavbarLink } from "bloomer/lib/components/Navbar/NavbarLink";
import { NavbarDropdown } from "bloomer/lib/components/Navbar/NavbarDropdown";
import { NavbarEnd } from "bloomer/lib/components/Navbar/NavbarEnd";
import { openLoginForm, openRegisterForm } from "../../redux/actions/modal";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import ActiveTasksCounter from "../task/ActiveCounter";

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev);
  };
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isLanguageActive = (lang) =>i18next.language === lang;
  const changeLanguage = (lang) => i18next.changeLanguage(lang);
  
  return (
    <BulmaNavbar>
      <NavbarBurger
        className="is-pulled-left"
        isActive={isMenuActive}
        onClick={toggleMenu}
      />
      <NavbarBrand >
        <NavbarItem href="/">
          <img src="/logo.png" alt="MintBerry" /> MintBerry
        </NavbarItem>
      </NavbarBrand>
      <NavbarMenu isActive={isMenuActive}>
        <NavbarStart>
          <NavbarItem href="/">{t("home")}</NavbarItem>
          <NavbarItem hasDropdown isHoverable>
            <NavbarLink >{t("lang")}</NavbarLink>
            <NavbarDropdown>
              <NavbarItem href="#" isActive={isLanguageActive("es")} onClick={()=>changeLanguage("es")}>ES</NavbarItem>
              <NavbarItem href="#" isActive={isLanguageActive("en")} onClick={()=>changeLanguage("en")}>EN</NavbarItem>
            </NavbarDropdown>
          </NavbarItem>
        </NavbarStart>
        <NavbarEnd>   
          <NavbarItem className="is-hidden-touch">
            <ActiveTasksCounter className="is-hidden-touch"/>
            </NavbarItem>      
          <NavbarItem href="#login" onClick={() => dispatch(openLoginForm())}>
            {t("login")}
          </NavbarItem>
          <NavbarItem href="#signup" onClick={() => dispatch(openRegisterForm())}>{t("signup")}</NavbarItem>
          <NavbarItem href="#logout">{t("logout")}</NavbarItem>
        </NavbarEnd>
      </NavbarMenu>
    </BulmaNavbar>
  );
};

export default Navbar;
