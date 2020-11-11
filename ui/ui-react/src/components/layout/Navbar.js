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
import { logout } from "../../redux/actions/session";
import { Icon } from "bloomer/lib/elements/Icon";

const Navbar = ({ isLoggedIn = false , username}) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev);
  };
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isLanguageActive = (lang) => i18next.language === lang;
  const changeLanguage = (lang) => {if(!isLanguageActive(lang))i18next.changeLanguage(lang)};

  return (
    <BulmaNavbar >
      <NavbarBurger
        className="is-pulled-left"
        isActive={isMenuActive}
        onClick={toggleMenu}
      />
      <NavbarBrand>
        <NavbarItem href="/">
          <img src="/logo.png" alt="MintBerry" /> MintBerry
        </NavbarItem>
      </NavbarBrand>
      <NavbarMenu isActive={isMenuActive}>
        <NavbarStart>
          <NavbarItem href="/">{t("home")}</NavbarItem>
          <NavbarItem hasDropdown isHoverable>
            <NavbarLink >{t("lang")}</NavbarLink>
            <NavbarDropdown  >
              <NavbarItem
                className="navbar-link is-arrowless "
                isActive={isLanguageActive("es")}
                onClick={() => changeLanguage("es")}
              >
                ES
              </NavbarItem>
              <NavbarItem
                className="navbar-link is-arrowless"
                isActive={isLanguageActive("en")}
                onClick={() => changeLanguage("en")}
              >
                EN
              </NavbarItem>
            </NavbarDropdown>
          </NavbarItem>       
        </NavbarStart>
        <NavbarEnd>
          {isLoggedIn ? (
            <>
              <NavbarItem className="is-hidden-touch">
                <ActiveTasksCounter className="is-hidden-touch" />
              </NavbarItem>
              <NavbarItem>
                <Icon className="fas fa-user mr-3"/>
                {`${username}`}
              </NavbarItem>
              <NavbarItem href="#logout" onClick={()=> dispatch(logout())}>{t("logout")}</NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem
                href="#login"
                onClick={() => dispatch(openLoginForm())}
              >
                {t("login")}
              </NavbarItem>
              <NavbarItem
                href="#signup"
                onClick={() => dispatch(openRegisterForm())}
              >
                {t("signup")}
              </NavbarItem>
            </>
          )}
        </NavbarEnd>
      </NavbarMenu>
    </BulmaNavbar>
  );
};

export default Navbar;
