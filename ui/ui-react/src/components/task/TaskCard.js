import React from "react";
import PropTypes from "prop-types";
import { Media } from "bloomer/lib/components/Media/Media";
import { MediaContent } from "bloomer/lib/components/Media/MediaContent";
import { Level } from "bloomer/lib/components/Level/Level";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { Card } from "bloomer/lib/components/Card/Card";
import { CardContent } from "bloomer/lib/components/Card/CardContent";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import { useDispatch, useSelector } from "react-redux";
import DeleteTaskButton from "./buttons/DeleteTaskButton";
import FlexBox from "../util/FlexBox";
import ExpiracyClock from "./ExpiracyClock";
import { Title } from "bloomer/lib/elements/Title";
import { openTaskDetail } from "../../redux/actions/modal";
import TaskAvatar from "../util/TaskAvatar";
import TaskActions from "./TaskActions";
import TaskStatus from "./TaskStatus";
import { FINISHED, STOPPED } from "./states";
import FinishedInfo from "./FinishedInfo";
import { selectTaskById } from "../../redux/reducers";
import RestartTaskButton from "./buttons/RestartTaskButton";

const placeholderImage =
  "https://www.freevector.com/uploads/vector/preview/28383/small_1x_Time_backgrounds_vector_3.jpg";
const TaskCard = ({ id }) => {
  const dispatch = useDispatch();
  const {
    title,
    description,
    image = placeholderImage,
    status,
    startedAt,
    finishedAt,
    expiresAt,
  } = useSelector((state) => selectTaskById(state, id) || {});
  if (status === FINISHED && !finishedAt) console.log(id);
  return (
      <Card style={{ margin: "auto" }} className="mb-2 mt-2">
        <CardContent onClick={() => dispatch(openTaskDetail(id))}>
          <Media>
            <MediaContent>
              <Level>
                <LevelLeft style={{ cursor: "pointer" }}>
                  <TaskAvatar src={image || placeholderImage} alt={title} />
                  <FlexBox isColumn>
                    <Title isSize="4" className="m-0">
                      {title} <TaskStatus status={status} />
                    </Title>
                    {status === FINISHED && (
                      <FinishedInfo
                        startedAt={startedAt}
                        finishedAt={finishedAt}
                      />
                    )}
                    {![FINISHED, STOPPED].includes(status) && (
                      <>
                        <ExpiracyClock date={expiresAt} /> <br />
                      </>
                    )}
                    {description}
                  </FlexBox>
                </LevelLeft>
                <LevelRight
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <TaskActions status={status} taskId={id} />
                  {status === FINISHED && <RestartTaskButton className="m-1" id={id}/>}
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
};

export default React.memo(TaskCard);
