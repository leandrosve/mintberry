import React, { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import ReactImagePicker from "react-image-picker";
import { Container } from "bloomer/lib/layout/Container";
import TaskAvatar from "./TaskAvatar";
import Modal from "../layout/Modal";
import { Delete } from "bloomer/lib/elements/Delete";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import { Level } from "bloomer/lib/components/Level/Level";
import { Title } from "bloomer/lib/elements/Title";
import { Button } from "bloomer/lib/elements/Button";
import { useTranslation } from "react-i18next";

const imageList = [
  "https://www.freevector.com/uploads/vector/preview/30943/large_1x_PROTECT_YOUR_SELF.jpg",
  "https://www.freevector.com/uploads/vector/preview/28692/small_1x_Coffee_Mug_vector_4.jpg",
  "https://www.freevector.com/uploads/vector/preview/30914/small_1x_treadmill_Mesa_de_trabajo_1.jpg",
  "https://www.freevector.com/uploads/vector/preview/29589/small_1x_Realistic_Dumbbell.jpg",
  "https://media.istockphoto.com/vectors/programming-code-application-window-vector-id1124838925?b=1&k=6&m=1124838925&s=612x612&w=0&h=D-6iUq--432J13EfemPrj4N2cQB-P6uZ1PJ7CrLMtMw=",
  "https://www.freevector.com/uploads/vector/preview/29718/small_1x_Grocery-Shop.jpg",
  "https://www.freevector.com/uploads/vector/preview/28383/small_1x_Time_backgrounds_vector_3.jpg",
  "https://www.freevector.com/uploads/vector/preview/2830/FreeVector-Computer-Screen-Graphics.jpg",
];

const ImagePicker = ({ handlePick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const onPick = useCallback((src) => {
    handlePick(src);
    handleClose();
  });
  const {t} = useTranslation();
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        {t("actions.avatarChoose")}
      </Button>
      <Modal
        isOpen={isOpen}
        style={{ zIndex: "1100", maxWidth: "300px" }}
        hasFooter={false}
        handleClose={handleClose}
      >
        <div
          style={{ textAlign: "center", maxHeight: "400px", overflowY: "auto" }}
        >
          {imageList.map((image, index) => (
            <TaskAvatar
              onClick={() => onPick(image)}
              key={index}
              src={image}
              alt={"Avatar " + index}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

ImagePicker.propTypes = {};

export default memo(ImagePicker);
