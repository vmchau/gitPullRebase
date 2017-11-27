import React from "react";
import { Switch, Route } from "react-router-dom";
import axios from 'axios';

import Home from "./Home.jsx";
import UserProfile from "./Components/UserProfile.jsx";
import ArtistProfile from "./Components/ArtistProfile.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facebookId: "",
      route: ""
    };
    this.setFacebookId = this.setFacebookId.bind(this);
  }

  profileClickHandler() {
    console.log('PROFILE CLICK HANDLER');
    axios({
      method: "post",
      url: "/userCheck",
      data: { facebookId: this.state.facebookId }
    }).then(userObj => {
      console.log("userObj ", userObj);
      let artist = userObj.data[0].role;
      console.log("artist is ", artist);
      //if user is regular user then render user Profile
      if (artist) {
        this.setState({ route: "/artist" });
      } else {
        this.setState({ route: "/user" });
      }
    });
  }

  /**
   * setFacebookId  
   * @param {[type]} [varname] [description]
   */
  setFacebookId(facebookId) {
    this.setState({
      facebookId: facebookId
    });
    this.profileClickHandler();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={props => (
              <Home
                facebookId={this.state.facebookId}
                setFacebookId={this.setFacebookId}
                route={this.state.route}
              />
            )}
          />
          <Route
            path="/user"
            component={props => (
              <UserProfile facebookId={this.state.facebookId} />
            )}
          />
          <Route
            path="/artist"
            component={props => {
              <ArtistProfile facebookId={this.state.facebookId} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
