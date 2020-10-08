import React from "react";
import { Footer as BulmaFooter } from "bloomer/lib/layout/Footer";
import { Container } from "bloomer/lib/layout/Container";
import { Content } from "bloomer/lib/elements/Content";
import { Columns } from "bloomer/lib/grid/Columns";
import { Column } from "bloomer/lib/grid/Column";

const Footer = () => {
  return (
    <BulmaFooter id="footer">
      <Container>
        <Content>
          <Columns>
            <Column>
              <p>MintBerry - Hecho por <strong>Leandro Svetlich</strong></p>            
            </Column>
          </Columns>
        </Content>
      </Container>
    </BulmaFooter>
  );
};

Footer.propTypes = {};

export default Footer;
