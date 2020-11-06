import React from "react";
import { Container } from "bloomer/lib/layout/Container";
import { Title } from "bloomer/lib/elements/Title";
import { Image } from "bloomer/lib/elements/Image";
import { Hero } from "bloomer/lib/layout/Hero/Hero";
import { HeroBody } from "bloomer/lib/layout/Hero/HeroBody";
import { Subtitle } from "bloomer/lib/elements/Subtitle";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation, Trans} from "react-i18next";
import {
  selectActiveTasksCount,
  selectFinishedTasksCount,
  selectIsUserAuthenticated,
  selectUsername,
} from "../redux/reducers";
import { Tag } from "bloomer/lib/elements/Tag";
import { setVisibilityFilter } from "../redux/actions/task";
import { FINISHED } from "./task/states";

const Welcome = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => selectIsUserAuthenticated(state));
  const username = useSelector((state) => selectUsername(state),);
  const activeCount= useSelector((state) => selectActiveTasksCount(state));
  const finishedCount= useSelector((state) =>selectFinishedTasksCount(state));
  
  return (
    <Hero isColor="primary">
      <HeroBody>
        <Container
          isFluid
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src="/logo_big.png"
            alt="MintBerry"
            style={{ height: "128px", width: "128px" }}
          />
          <Title
            className="has-text-centered"
            isSize={3}
            style={{ textShadow: "2px 4px 3px rgba(0,0,0,0.3)" }}
          >
            MintBerry
          </Title>
          {isAuthenticated && (
            <>
            <Subtitle>
            <Trans i18nKey="welcomeMessage" count={activeCount}>
              Welcome <strong>{{name:username}}</strong>, you have <strong>{{count:activeCount}}</strong> active tasks.
            </Trans>
            </Subtitle>
            {finishedCount > 0 && 
            <Tag style={{cursor:"pointer"}} isSize={5} className="is-secondary is-size-6 p-2" onClick={()=>dispatch(setVisibilityFilter(FINISHED))}>
              {t("finishedTasks")}: {finishedCount}
            </Tag>
            }
            </>
          )}
        </Container>
      </HeroBody>
    </Hero>
  );
};

export default React.memo(Welcome);
