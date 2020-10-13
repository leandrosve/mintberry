import { Section } from "bloomer/lib/layout/Section";
import React from "react";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import TaskList from "./components/task/TaskList";
import Welcome from "./components/Welcome";
import ModalContainer from "./containers/ModalContainer";
import ReactTooltip from "react-tooltip";
import DialogContainer from "./containers/DialogContainer";
import i18n from "./i18n";
import { useDispatch } from "react-redux";
import { CLEAR_ALL_NOTIFICATIONS } from "./redux/actions/types";

function App() {
  const dispatch = useDispatch();
  i18n.on("languageChanged", () => dispatch({ type: CLEAR_ALL_NOTIFICATIONS }));
 
  return (
    <div style={{ height: "100%" }}>
      <Navbar />
      <DialogContainer />
      <ModalContainer />
      <ReactTooltip delayUpdate={100} />
      <Welcome data-tip="hello world" />   
      <Section>
        <TaskList />
      </Section>
      <Footer />
    </div>
  );
}

export default App;
