import React from "react";
import PropTypes from "prop-types";
import { Media } from "bloomer/lib/components/Media/Media";
import { MediaContent } from "bloomer/lib/components/Media/MediaContent";
import { Level } from "bloomer/lib/components/Level/Level";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { Icon } from "bloomer/lib/elements/Icon";
import { Card } from "bloomer/lib/components/Card/Card";
import { CardContent } from "bloomer/lib/components/Card/CardContent";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import IconButton from "../util/IconButton";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import DeleteTaskButton from "./buttons/DeleteTaskButton";
import FlexBox from "../util/FlexBox";
import ExpiracyClock from "./ExpiracyClock";
import { Title } from "bloomer/lib/elements/Title";
import { openTaskDetail } from "../../redux/actions/modal";
import TaskAvatar from "../util/TaskAvatar";
import TaskActions from "./TaskActions";
import TaskState from "./TaskState";
import { FINISHED, STOPPED } from "./states";
import FinishedInfo from "./FinishedInfo";

const TaskCard = ({
  id,
  title,
  description,
  image = "https://via.placeholder.com/128x128",
  state,
  startedAt,
  finishedAt,
  expiresAt,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <Card style={{ margin: "auto" }} className="mb-2 mt-2">
      <CardContent>
        <Media>
          <MediaContent>
            <Level>
              <LevelLeft
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(openTaskDetail(id))}
              >              
                  <TaskAvatar src={image} alt={title} />
                  <FlexBox isColumn>
                    <Title isSize="4" className="m-0">
                      {title} <TaskState state={state} />
                    </Title>
                    {state === FINISHED && <FinishedInfo startedAt={startedAt} finishedAt={finishedAt}/>}
                    {![FINISHED, STOPPED].includes(state) && (
                      <>
                        <ExpiracyClock date={expiresAt} /> <br />
                      </>
                    )}
                    {description}               
                </FlexBox>
              </LevelLeft>
              <LevelRight style={{ display: "flex", justifyContent: "center" }}>
                <TaskActions state={state} taskId={id}/>
                <DeleteTaskButton className="m-1" id={id} />
              </LevelRight>
            </Level>
          </MediaContent>
        </Media>
      </CardContent>
    </Card>
  );
};

TaskCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  state: PropTypes.string.isRequired,
  expiresAt: PropTypes.any.isRequired,
};

export default TaskCard;
