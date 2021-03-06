import React, { useState } from "react";
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
import TaskStatus from "./TaskStatus";
import DeleteTaskButton from "./buttons/DeleteTaskButton";
import { Icon } from "bloomer/lib/elements/Icon";
import moment from "moment";
import { Subtitle } from "bloomer/lib/elements/Subtitle";
import { FINISHED, STOPPED } from "./states";
import EditTaskButton from "./buttons/EditTaskButton";
import imageList from "./imageList";
import ImagePicker from "../util/ImagePicker";
import FinishedInfo from "./FinishedInfo";
import NotificationContainer from "../../containers/NotificationContainer";
import { EDIT_TASK_REQUEST } from "../../redux/actions/types";
import RestartTaskButton from "./buttons/RestartTaskButton";

const placeholderImage = "https://www.freevector.com/uploads/vector/preview/28383/small_1x_Time_backgrounds_vector_3.jpg";

const TaskDetail = ({
  id,
  image,
  title,
  status,
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
      <NotificationContainer concerns={[EDIT_TASK_REQUEST]}/>
      <Level  className="m-0">
        <LevelLeft style={{display:"flex"}} className="is-justify-content-center" >
          <TaskAvatar
            style={{ cursor: "pointer" }}
            data-tip={t("actions.avatarChange")}
            src={image || placeholderImage}
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
          
          
        </LevelLeft>
        <LevelRight 
           style={{display:"flex", flex:1}} className="is-justify-content-start">
            <Title style={{ display: "flex",  wordWrap:"ellipsis"}} className="m-0 ">
            {title}
          </Title>
        </LevelRight>
      </Level>
      <div className="is-align-self-flex-start">
          <TaskStatus status={status} className="ml-3"  />
          
       
          {status === FINISHED ? (
            <FinishedInfo startedAt={startedAt} finishedAt={finishedAt} />
          ) : status !== STOPPED &&
            <ExpiracyClock date={expiresAt} />
          }
            </div>
      <div className="block m-2">
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

      <Level isMobile={true}>
        <LevelLeft>
          <TaskActions taskId={id} status={status} />
        </LevelLeft>
        <LevelRight>
          <RestartTaskButton id={id}/>
          <EditTaskButton id={id}/>
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
  status: PropTypes.string.isRequired,
  expiresAt: PropTypes.any.isRequired,
  createdAt: PropTypes.any.isRequired,
};

export default connect(mapStateToProps, null)(TaskDetail);
