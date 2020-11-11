import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Modal } from "bloomer/lib/components/Modal/Modal";
import { ModalBackground } from "bloomer/lib/components/Modal/ModalBackground";
import { ModalContent } from "bloomer/lib/components/Modal/ModalContent";
import { ModalCard } from "bloomer/lib/components/Modal/Card/ModalCard";
import { ModalCardBody } from "bloomer/lib/components/Modal/Card/ModalCardBody";
import { Level } from "bloomer/lib/components/Level/Level";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import { Button } from "bloomer/lib/elements/Button";
import { LevelItem } from "bloomer/lib/components/Level/LevelItem";
import { useTranslation } from "react-i18next";

const Dialog = ({ handleCancel, handleAccept, isOpen,  message }) => {
    const { t } = useTranslation();

  useEffect(()=>document.addEventListener("keydown", (e)=>{if(e.key === "Escape")handleCancel()}, false),[handleCancel]);
  return (
    <Modal isActive={isOpen} style={{zIndex:"1000"}}>
      <ModalBackground onClick={handleCancel} />
      <ModalContent>
        <ModalCard style={{ margin: "auto" , maxWidth:"600px"}}>
          <ModalCardBody>
            {message}
            <Level isMobile>
              <LevelLeft />
              <LevelRight>              
                <LevelItem>
                  <Button onClick={handleCancel}>{t("confirmation.cancel")}</Button>
                </LevelItem>
                <LevelItem>
                  <Button isColor="danger" onClick={handleAccept}>{t("confirmation.accept")}</Button>
                </LevelItem>
              </LevelRight>
            </Level>
          </ModalCardBody>
        </ModalCard>
      </ModalContent>
    </Modal>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  handleCancel: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  handleAccept: PropTypes.func.isRequired,
};

export default Dialog;
