import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfoCard from '../components/InfoCard';
import Nav from '../components/Nav';
import logo from '../FinalLogo.png';
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import React, { useState } from 'react';
import axios from 'axios';

function getCardText(applied) {
  if (applied) {
    return "Thank you submitting your application! Please be patient as we make our admissions decisions.";
  }
  else {
    return "RoboTech is now accepting applications! Follow the link below to submit your application to participate!";
  }
}

function getCardTitle(applied) {
  return applied ? "Thank you!" : "Apply Now!";
}

function Old() {
  var [applied, setApplied] = useState(false);

  let hasApplied = async () => {
    try {
      const response = await axios.post('/api/users/hasInfo', {token: localStorage.getItem('token'), userId: localStorage.getItem('id')});
      if (response.data.hasInfo) {
        setApplied(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  hasApplied();

  return (
    <div className="App container">
      <img src={logo} className="img-fluid col-2"></img>
      <h1 className="pt-2 robotech-color">My Robotech</h1>
      <hr></hr>

      <Nav />

    <InfoCard cardTitle={getCardTitle(applied)} cardText={getCardText(applied)} linkTo={!applied && 'Apply'} linkRoute='/apply' /> 

    <AuthContext.Consumer>
        {({logout}) => (
          <button type="submit" className="btn robotech-bg mt-3" onClick={logout}>Logout</button>
        )}
    </AuthContext.Consumer>

    </div>

    
  );

}

class Home extends React.Component {
  static contextType = AuthContext;

  async componentDidMount() {
    if (!this.context.applied) {
      this.context.hasApplied();
    }
  }

  render() {
    return (
      <div className="App container">
        <img src={logo} className="img-fluid col-2"></img>
        <h1 className="pt-2 robotech-color">My Robotech</h1>
        <hr></hr>
        <Nav />
        <InfoCard cardTitle={getCardTitle(this.context.applied)} cardText={getCardText(this.context.applied)} linkTo={!this.context.applied && 'Apply'} linkRoute='/apply' /> 
        <button type="submit" className="btn robotech-bg mt-3" onClick={this.context.logout}>Logout</button>
      </div>
    )
  }
}

export default Home;