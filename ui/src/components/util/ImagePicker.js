import React, { memo, useCallback } from "react";
import TaskAvatar from "./TaskAvatar";
import Modal from "../layout/Modal";

const ImagePicker = ({ handlePick, handleClose, images, isOpen}) => {
  const onPick = useCallback((src) => {
    handlePick(src);
    handleClose();
  },[handlePick, handleClose]);
  return (
    <>
      <Modal
        isOpen={isOpen}
        style={{ zIndex: "1100", maxWidth: "300px" }}
        hasFooter={false}
        handleClose={handleClose}
      >
        <div
          style={{ textAlign: "center", maxHeight: "400px", overflowY: "auto" }}
        >
          {images.map((image, index) => (
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
