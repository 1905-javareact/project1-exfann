import React from 'react';
import logo from './logo.svg';
import './App.css';
import './include/bootstrap'
// import { FirstComponent } from './components/firstcomponent/first.component';
// import { SecondComponent } from './components/secondcomponent/second.component';
import  SignInComponent  from './components/signin/signin.component';
import { Route, Switch} from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { NavComponent } from './components/nav/nav.component';
import  UserComponent  from './components/usercomponent/users.component';
import { Provider } from 'react-redux';
import { store } from './Store';
import { HomeComponent } from './components/home.component.tsx/home.component';
import userIdComponent from './components/usercomponent/user-id.component';
import  ReimByStatusComponent  from './components/reimbursementcomponent/reimbursementstatus.component';
import  ReimByAuthorComponent  from './components/reimbursementcomponent/reimbursementauthor.component';
import  ReimSubmitComponent  from './components/reimbursementcomponent/reimbursementsubmit.component';


const App: React.FC = () => {
  return (
    <Provider store={store}>
    <div className="App">
      <BrowserRouter>
        <NavComponent/>
          <Switch>
            <Route exact path='/' component={HomeComponent}/>
            <Route path='/home' component={HomeComponent}/>
            <Route path='/login' component={SignInComponent}/>
            <Route exact path='/users' component={UserComponent}/>
            <Route path = '/users/' component={userIdComponent}/>
            <Route path = '/reimbursements/status/' component={ReimByStatusComponent}/>
            <Route path = '/reimbursements/author/userId' component={ReimByAuthorComponent}/>
            <Route exact path = '/reimbursements' component={ReimSubmitComponent}/>
          </Switch>
        </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
