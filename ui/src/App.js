import { Section } from "bloomer/lib/layout/Section";
import React from "react";
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

function App() {
  const dispatch = useDispatch();
  i18n.on("languageChanged", () => dispatch({ type: CLEAR_ALL_NOTIFICATIONS }));
  const isAuthenticated = useSelector(state => selectIsUserAuthenticated(state));
  return (
    <div style={{ height: "100%" }}>
      <NavbarContainer/>
      <DialogContainer />
      <ModalContainer />
      <ReactTooltip delayUpdate={100} />
      <Welcome data-tip="hello world" /> 
      
      <Section>
        {isAuthenticated && <TasksContainer />}
      </Section>
      <Footer />
    </div>
  );
}

export default App;
