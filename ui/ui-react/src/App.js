import { Section } from "bloomer/lib/layout/Section";
import React from "react";
import Footer from "./components/layout/Footer";
import Welcome from "./components/Welcome";
import ModalContainer from "./containers/ModalContainer";
import ReactTooltip from "react-tooltip";
import DialogContainer from "./containers/DialogContainer";
import {useSelector } from "react-redux";
import TasksContainer from "./containers/TasksContainer";
import NavbarContainer from "./containers/NavbarContainer";
import { selectIsUserAuthenticated } from "./redux/reducers";
import GuestHome from "./components/GuestHome";

function App() {

  const isAuthenticated = useSelector((state) =>
    selectIsUserAuthenticated(state)
  );

  return (
    <div style={{minHeight:"100vh", display:"flex"}} className="is-flex-direction-column">
      <DialogContainer />
      <ModalContainer />
      <ReactTooltip delayUpdate={100} />
      <NavbarContainer/>
     
      <Welcome/>  
      <Section style={{display:"flex", flex:"auto"}}>
        {isAuthenticated ? (
          <TasksContainer />
        ) : (
            <GuestHome/>
        )}
      </Section>
      <Footer />
    
      
    </div>
  );
}

export default App;
