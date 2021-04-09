import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Signup from '../ui/Signup';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import AddRoom from '../ui/AddRoom';
import AddLecture from '../ui/AddLecture';
import PrivatHeader from '../ui/PrivateHeader';
import InfoBar from '../ui/InfoBar';
import LecturesList from '../ui/LecturesList';
import RoomsList from '../ui/RoomsList';
import FlatButtonMenu from '../ui/FlatButtonMenu';
import Room from '../ui/Room';
import Lecture from '../ui/Lectures';
import HappeningContainer from '../ui/HappeningContainer';
import Ayy from '../ui/Ayy';
import Dashboard from '../ui/Dashboard';
import ThirdPartyPlayCanvasAalto from '../ui/ThirdPartyPlayCanvasAalto';
import ThirdPartyPannellum from '../ui/ThirdPartyPannellum';
import QR from '../ui/QR';
import Table from '../ui/Table';
import HighScores from '../ui/HighScores';
import Tickets from '../ui/Tickets';
import ProsConsChips from '../ui/ProsConsChips';
//uncomment scripts in header of main.html
// import ThirdPartyX3DOM from '../ui/ThirdPartyX3DOM';
// import RenJsComponent from '../ui/RenJsComponent';
// import ThirdPartyPhaser from '../ui/ThirdPartyPhaser';
// import ThirdPartyPixi from '../ui/ThirdPartyPixi';
// import ThirdPartyWoofjs from '../ui/ThirdPartyWoofjs';


const onEnterPage = (nextState,pageType) => {
  // console.log(pageType);
  Session.set('selectedPage', {"parameter":nextState.params.id,"pagetype":pageType});
};
const onLeavePage = () => {
  Session.set('selectedPage', undefined);
};

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};
export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
    Session.set('currentPagePrivacy', lastRoute.privacy);


};
export const routes = (
  <div>
    {/* <PrivatHeader/>
    <InfoBar/>
    <FlatButtonMenu/> */}
      <Router history={browserHistory}>
        <Route onEnter={globalOnEnter} onChange={globalOnChange}>
            <Route path="/" component={Login} privacy="unauth"/>
            <Route path="/signup" component={Signup} privacy="unauth"/>
            <Route path="/dashboard" component={Dashboard} privacy="auth" exact={true}/>
            <Route path="/addroom" component={AddRoom} privacy="auth"/>
            <Route path="/addlecture" component={AddLecture} privacy="auth"/>
            <Route path="/rooms" component={RoomsList} privacy="auth" />
            <Route path="/lectures" component={LecturesList} privacy="auth" />
            <Route path="/myrooms" component={Room} privacy="auth" />
            <Route path="/mylectures" component={Lecture} privacy="auth"/>
            <Route path="/happenings" component={Ayy} privacy="auth"/>
            <Route path="/aalto" component={ThirdPartyPlayCanvasAalto} privacy="auth"/>
            <Route path="/userfeedback" component={ThirdPartyPannellum} privacy="auth"/>
            <Route path="/table" component={Table} privacy="auth"/>
            <Route path="/highscores" component={HighScores} privacy="auth"/>
            <Route path="/mytickets" component={Tickets} privacy="auth"/>
            <Route path="/pros" component={ProsConsChips} privacy="auth"/>
            {/* <Route path="/x3dom" component={ThirdPartyX3DOM} privacy="auth"/>
            <Route path="/renjs" component={RenJsComponent} privacy="auth"/> */}
            {/* <Route path="/rain" component={Raindeer} privacy="auth"/> */}

            {/* <Route path="/baba" component={ThirdPartyPhaser} privacy="auth"/>
            <Route path="/third" component={ThirdPartyPlayCanvas} privacy="auth"/> */}
            {/* <Route path="/thirdpixi" component={ThirdPartyPixi} privacy="auth"/> */}
              {/* <Route path="/thirdwoof" component={ThirdPartyWoofjs} privacy="auth"/> */}
            <Route path="/room/:id" component={Room} privacy="auth" onEnter={(e)=>onEnterPage(e,"room")} onLeave={onLeavePage}/>
            <Route path="room/:id/feedback" component={ThirdPartyPannellum} privacy="auth" onEnter={(e)=>onEnterPage(e,"room")} onLeave={onLeavePage} exact={true}/>
            <Route path="room/:id/feedback/:pitch/:yaw" component={ThirdPartyPannellum} privacy="auth" onEnter={(e)=>onEnterPage(e,"room")} onLeave={onLeavePage} exact={true}/>
            <Route path="/lecture/:id" component={Lecture} privacy="auth" onEnter={(e)=>onEnterPage(e,"lecture")} onLeave={onLeavePage}/>
            <Route path="/qr" component={QR} privacy="auth" onEnter={(e)=>onEnterPage(e,"qr")} onLeave={onLeavePage}/>
    {/* <Route path="/dashboard/lecture/:id" component={AppLayout} privacy="auth" onEnter={onEnterPage} onLeave={onLeavePage}/> */}
            <Route path="*" component={NotFound}/>
        </Route>
      </Router>

  </div>

);
