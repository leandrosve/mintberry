import React from "react";
import PropTypes from "prop-types";
import { Content } from "bloomer/lib/elements/Content";
import BranchCard from "./StoreCard";
import branches from "../../backend/branches";
import { Container } from "bloomer/lib/layout/Container";
import { Title } from "bloomer/lib/elements/Title";
import { Button } from "bloomer/lib/elements/Button";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import { Level } from "bloomer/lib/components/Level/Level";
import { Icon } from "bloomer/lib/elements/Icon";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { openStoreForm } from "../../redux/actions/modal";

const StoreList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <Container>
      <Level>
        <LevelLeft>
          <Title isSize="2">{t("stores")}</Title>
        </LevelLeft>
        <LevelRight>
          <Button onClick={() => dispatch(openStoreForm())}>
            <Icon isSize="small" className=" fas fa-warehouse" />{" "}
            <span>{t("actions.storeAdd")}</span>
          </Button>
        </LevelRight>
      </Level>

      <Content>
        <ol style={{ margin: "auto" }}>
          {branches.map((branch) => (
            <li key={branch.id} style={{ listStyleType: "none" }}>
              <BranchCard {...branch} />
            </li>
          ))}
        </ol>
      </Content>
    </Container>
  );
};

StoreList.propTypes = {};

export default StoreList;
