import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container } from "bloomer/lib/layout/Container";
import { Title } from "bloomer/lib/elements/Title";
import ExpiracyClock from "./ExpiracyClock";
import { connect } from "react-redux";
import { selectTaskById } from "../../redux/reducers";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import { Level } from "bloomer/lib/components/Level/Level";
import TaskAvatar from "../util/TaskAvatar";
import TaskActions from "./TaskActions";
import { useTranslation } from "react-i18next";
import TaskState from "./TaskState";
import DeleteTaskButton from "./buttons/DeleteTaskButton";
import { Icon } from "bloomer/lib/elements/Icon";
import moment from "moment";
import { Subtitle } from "bloomer/lib/elements/Subtitle";
import { FINISHED, STOPPED } from "./states";
import EditTaskButton from "./buttons/EditTaskButton";
import imageList from "./imageList";
import ImagePicker from "../util/ImagePicker";
import FinishedInfo from "./FinishedInfo";

const TaskDetail = ({
  id,
  image,
  title,
  state,
  expiresAt,
  startedAt,
  finishedAt,
  description,
  createdAt,
}) => {
  const { t } = useTranslation();
  const [openImagePicker, setOpenImagePicker] = useState(false);
  return (
    <Container>
      <Level className="m-0">
        <LevelLeft>
          <TaskAvatar
            style={{ cursor: "pointer" }}
            data-tip={t("actions.avatarChange")}
            src={image}
            alt={title}
            onClick={() => setOpenImagePicker(true)}
          />
          <ImagePicker
            handlePick={(src) => {
              console.log("asdasd");
            }}
            handleClose={() => setOpenImagePicker(false)}
            images={imageList}
            isOpen={openImagePicker}
          />
          <Title style={{ display: "inline" }} className="m-0">
            {title}
          </Title>
          <TaskState state={state} className="ml-3" />
        </LevelLeft>
        <LevelRight>
          {state === FINISHED ? (
            <FinishedInfo startedAt={startedAt} finishedAt={finishedAt} />
          ) : state !== STOPPED &&
            <ExpiracyClock date={expiresAt} />
          }
        </LevelRight>
      </Level>
      <div className="block mb-2">
        <Subtitle isSize="5">{description}</Subtitle>
      </div>
      <div className="block m-0">
        <Icon className="fas fa-calendar-alt" />
        {t("createdDate")}: {moment(createdAt).format("LLL")}
      </div>
      <div className="block m-0">
        <Icon className="fas fa-calendar-times" />
        {t("expiracyDate")}: {moment(expiresAt).format("LLL")}
      </div>

      <Level>
        <LevelLeft>
          <TaskActions taskId={id} state={state} />
        </LevelLeft>
        <LevelRight>
          <EditTaskButton />
          <DeleteTaskButton id={id} />
        </LevelRight>
      </Level>
    </Container>
  );
};

const mapStateToProps = (state, { id }) => {
  const task = selectTaskById(state, id);
  return task ? { ...task } : null;
};

TaskDetail.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  state: PropTypes.string.isRequired,
  expiresAt: PropTypes.any.isRequired,
  createdAt: PropTypes.any.isRequired,
};

export default connect(mapStateToProps, null)(TaskDetail);
