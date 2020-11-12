import React from "react";
import { Footer as BulmaFooter } from "bloomer/lib/layout/Footer";
import { Container } from "bloomer/lib/layout/Container";
import { Content } from "bloomer/lib/elements/Content";
import { Columns } from "bloomer/lib/grid/Columns";
import { Column } from "bloomer/lib/grid/Column";
import { Trans } from "react-i18next";

const Footer = () => {
  return (
    <BulmaFooter id="footer is-pulled-bottom">
      <Container>
        <Content>
          <Columns>
            <Column>

              <span>MintBerry <img src="/logo.png" alt="mintberry" style={{width:"20px", height:"20px"}}/> </span>
              <Trans i18nKey="credits">
              By <strong>{{name:"Leandro Svetlich"}}</strong>. Made with React JS and Express.js
                </Trans>        
            </Column>
          </Columns>
        </Content>
      </Container>
    </BulmaFooter>
  );
};

Footer.propTypes = {};

export default Footer;
