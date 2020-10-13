import React from "react";
import { Container } from "bloomer/lib/layout/Container";
import { Title } from "bloomer/lib/elements/Title";
import { Image } from "bloomer/lib/elements/Image";
import { Hero } from "bloomer/lib/layout/Hero/Hero";
import { HeroBody } from "bloomer/lib/layout/Hero/HeroBody";

const Welcome = () => {
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
        </Container>
      </HeroBody>
    </Hero>
  );
};

export default Welcome;
