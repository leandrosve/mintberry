import React from "react";
import PropTypes from "prop-types";
import { Card } from "bloomer/lib/components/Card/Card";
import { Icon } from "bloomer/lib/elements/Icon";
import { CardContent } from "bloomer/lib/components/Card/CardContent";
import { Media } from "bloomer/lib/components/Media/Media";
import { MediaLeft } from "bloomer/lib/components/Media/MediaLeft";
import { Title } from "bloomer/lib/elements/Title";
import { Subtitle } from "bloomer/lib/elements/Subtitle";
import { MediaContent } from "bloomer/lib/components/Media/MediaContent";
import { Button } from "bloomer/lib/elements/Button";
import { Level } from "bloomer/lib/components/Level/Level";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import FlexBox from "../util/FlexBox";

const placeholderImage= "https://www.flaticon.com/svg/static/icons/svg/3165/3165829.svg";
const StoreCard = ({ name, address, owner, image=placeholderImage }) => {
  return (
    <Card onClick={() => alert()}>
      <CardContent>
        <Media
          style={{
            cursor: "pointer",
          }}
        >
          <MediaLeft stlye={{ width: "128px" }} className="is-hidden-mobile" >
            <figure className="image" style={{ margin: "0px" }}>
              <img
                alt={name}
                style={{ height: "125px", width: "125px" }}
                className="image is-rounded"
                src={image}
              />
            </figure>
          </MediaLeft>
          <MediaContent>        
            <Title isSize="3" className="is-marginless" style={{wordWrap:"break-word"}}>
              {name}
            </Title>                      
            <Level>
              <LevelLeft>
                <FlexBox isColumn>
                  <Subtitle isSize={5} className="is-marginless">
                    <Icon className="fas fa-map-marker-alt" />
                    {address}
                  </Subtitle>
                  <FlexBox>
                    <Icon className="fas fa-user" />
                    <small>{owner}</small>
                  </FlexBox>
                </FlexBox>
              </LevelLeft>
              <LevelRight>
                <Button isColor="info">Ver stock</Button>
              </LevelRight>
            </Level>
          </MediaContent>
        </Media>
      </CardContent>
    </Card>
  );
};

StoreCard.propTypes = {
  name: PropTypes.string.isRequired, 
  address: PropTypes.string.isRequired, 
  owner: PropTypes.string.isRequired, 
  image: PropTypes.string,
};

export default StoreCard;
