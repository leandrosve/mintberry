import React from 'react';
import LoginForm from "./user/LoginForm";
import SignupForm from "./user/SignupForm";
import { Card } from "bloomer/lib/components/Card/Card";
import { useSelector } from 'react-redux';
import { selectModalContentType, selectModalIsOpen } from '../redux/reducers';
import { Level } from 'bloomer/lib/components/Level/Level';
import { LevelLeft } from 'bloomer/lib/components/Level/LevelLeft';
import { LevelRight } from 'bloomer/lib/components/Level/LevelRight';
 
const GuestHome = () => {
    const isLoginModalOpen = useSelector(state=>selectModalContentType(state) === "LoginForm" && selectModalIsOpen(state))
    const isSignupModalOpen = useSelector(state=>selectModalContentType(state) === "SignupForm" && selectModalIsOpen(state))
    return (       
          <Level className="is-justify-content-center is-align-items-start" style={{margin:"auto", minWidth:"200px"}}>
            <LevelLeft>
            <Card className="p-2 m-2">
                  <LoginForm showSignupSuccess={false} showNotifications={!isLoginModalOpen}/>
                </Card>
            </LevelLeft>
            <LevelRight>
            <Card className="p-2 m-2">
                  {" "}
                  <SignupForm showNotifications={!isSignupModalOpen}/>
                </Card>
            </LevelRight>
          </Level>                               
    );
}
 
GuestHome.propTypes = {};
 
export default GuestHome;