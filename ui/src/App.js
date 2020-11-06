import { Section } from "bloomer/lib/layout/Section";
import React, { useEffect } from "react";
import Footer from "./components/layout/Footer";
import Welcome from "./components/Welcome";
import ModalContainer from "./containers/ModalContainer";
import ReactTooltip from "react-tooltip";
import DialogContainer from "./containers/DialogContainer";
import i18n from "./i18n";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ALL_NOTIFICATIONS } from "./redux/actions/types";
import TasksContainer from "./containers/TasksContainer";
import NavbarContainer from "./containers/NavbarContainer";
import { selectIsUserAuthenticated } from "./redux/reducers";
import LoginForm from "./components/LoginForm";
import { Container } from "bloomer/lib/layout/Container";
import SignupForm from "./components/SignupForm";
import { Card } from "bloomer/lib/components/Card/Card";
import * as Yup from "yup";
function App() {
  const dispatch = useDispatch();
  i18n.on("languageChanged", () => dispatch({ type: CLEAR_ALL_NOTIFICATIONS }));
  const isAuthenticated = useSelector((state) =>
    selectIsUserAuthenticated(state)
  );

  return (
    <div style={{height:"100vh"}}>
      <NavbarContainer />
      <DialogContainer />
      <ModalContainer />
      <ReactTooltip delayUpdate={100} />
      <Welcome data-tip="hello world" />
      <Section>
        {isAuthenticated ? (
          <TasksContainer />
        ) : (
          <Container>
          <div class="tile is-ancestor">
            <div class="tile is-horizontal ">
              <div class="tile  is-vertical">
                <Card className="p-5 m-5">
                  <LoginForm showSignupSuccess={false}/>
                </Card>
              </div>
              <div class="tile ">
                <Card className="p-5 m-5">
                  {" "}
                  <SignupForm />
                </Card>
              </div>
            </div>
          </div>
          </Container>
        )}
      </Section>
      <Footer />
    </div>
  );
}

export default App;
