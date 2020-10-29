import React from "react";
import PropTypes from "prop-types";
import { Media } from "bloomer/lib/components/Media/Media";
import { MediaContent } from "bloomer/lib/components/Media/MediaContent";
import { Level } from "bloomer/lib/components/Level/Level";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { Card } from "bloomer/lib/components/Card/Card";
import { CardContent } from "bloomer/lib/components/Card/CardContent";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import { useDispatch } from "react-redux";
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

const placeholderImage = "https://www.freevector.com/uploads/vector/preview/28383/small_1x_Time_backgrounds_vector_3.jpg";
const TaskCard = ({
  id,
  title,
  description,
  image = placeholderImage,
  status,
  startedAt,
  finishedAt,
  expiresAt,
}) => {
  const dispatch = useDispatch();
  if(status===FINISHED && !finishedAt) console.log(id);
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
                  <TaskAvatar src={image || placeholderImage} alt={title} />
                  <FlexBox isColumn>
                    <Title isSize="4" className="m-0">
                      {title} <TaskStatus status={status} />
                    </Title>
                    {status === FINISHED && <FinishedInfo startedAt={startedAt} finishedAt={finishedAt}/>}
                    {![FINISHED, STOPPED].includes(status) && (
                      <>
                        <ExpiracyClock date={expiresAt} /> <br />
                      </>
                    )}
                    {description}               
                </FlexBox>
              </LevelLeft>
              <LevelRight style={{ display: "flex", justifyContent: "center" }}>
                <TaskActions status={status} taskId={id}/>
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
  status: PropTypes.string.isRequired,
  expiresAt: PropTypes.any.isRequired,
};

export default React.memo(TaskCard);
