import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ModalBackground } from "bloomer/lib/components/Modal/ModalBackground";
import { ModalContent } from "bloomer/lib/components/Modal/ModalContent";
import { Modal as BulmaModal } from "bloomer/lib/components/Modal/Modal";
import { ModalCard } from "bloomer/lib/components/Modal/Card/ModalCard";
import { Delete } from "bloomer/lib/elements/Delete";
import { ModalCardBody } from "bloomer/lib/components/Modal/Card/ModalCardBody";
import { ModalCardFooter } from "bloomer/lib/components/Modal/Card/ModalCardFooter";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { LevelItem } from "bloomer/lib/components/Level/LevelItem";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import { Level } from "bloomer/lib/components/Level/Level";
import ReactTooltip from "react-tooltip";

const Modal = ({
  children,
  isOpen = false,
  handleClose,
  hasFooter = true,
  style,
}) => {
  useEffect(() => {
    ReactTooltip.rebuild();
  },[]);
  return (
    <BulmaModal isActive={isOpen}>
      <ModalBackground onClick={handleClose}/>
     
        <ModalCard style={{ margin: "auto", ...style }}>
          <ModalCardBody>{children}</ModalCardBody>
          {hasFooter && (
            <ModalCardFooter style={{height:"20px"}}>
              <Level style={{ width: "100%" }} isMobile={true}>
                <LevelLeft />
                <LevelRight className="m-0">
                  <LevelItem>
                    <div>
                      <Delete onClick={handleClose} />
                    </div>
                  </LevelItem>
                </LevelRight>
              </Level>
            </ModalCardFooter>
          )}
        </ModalCard>
     
    </BulmaModal>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  hasFooter: PropTypes.bool,
};

export default Modal;
