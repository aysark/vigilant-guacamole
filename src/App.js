import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import logo from './medjoyn_white.png';
import BottomNavigation from './bottomNav';

import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/social/person';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import DrugSearch from './DrugSearch';
import PrescriptionList from './PrescriptionList';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import './App.css';

import PatientClient from './PatientClient';

const headerStyle = {
    display: 'block',
    textAlign: 'left'
};

const logoStyle = {
  width: '150px',
  marginTop: '20px'
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      patient:[],
      patientListingPage: true,
      patientInfoPage: false,
      prescriptionPage: false,
      patientMeds:[],
      dataSource: [],
      prescriptionPageRender: null,
    }

    this.renderPatientListItem = this.renderPatientListItem.bind(this);
    this.handlePatientListItem = this.handlePatientListItem.bind(this);

    this.renderPatientMeds = this.renderPatientMeds.bind(this);
    this.metaOnNewRequest = this.metaOnNewRequest.bind(this);
  }

  renderPatientListItem(id) {
    PatientClient.getPatient(id, (results) => {
      this.setState({ patient: results[0] })
    });
  }

  renderPatientMeds(id) {
    PatientClient.getPatientMeds(id, (results) => {
      this.setState({ patientMeds: results })
    });
  }

  handlePatientListItem(e) {
    this.setState({
      patientListingPage: false,
      patientInfoPage: true,
      prescriptionPage: false
    });
  }

  metaOnNewRequest() {
    this.setState({
      prescriptionPage: true
    });
  }

  componentDidMount() {
    this.renderPatientListItem(1299);
    this.renderPatientMeds(1299);
  }

  render() {
    // console.info(this.state.patientMeds.medications);

    let Cmp;
    if (this.state.patientListingPage) {
      Cmp = () => (
        <List>
              <ListItem
                primaryText={this.state.patient.firstname + ' ' + this.state.patient.lastname}
                rightAvatar={<Avatar src="images/p1.png" />}
                onClick={this.handlePatientListItem} 
              />
              <ListItem
               primaryText= "Mary James"
               rightAvatar={<Avatar src="images/p2.png" />}
               onClick={this.handlePatientListItem}
             />
             <ListItem
               primaryText= "Sam Smith"
               rightAvatar={<Avatar src="images/p3.png" />}
               onClick={this.handlePatientListItem}
             />
             <ListItem
               primaryText= "Zig Ziggler"
               rightAvatar={<Avatar icon={<Person />} />}
               onClick={this.handlePatientListItem}
             />
             <ListItem
               primaryText="Lisa Qu"
               rightAvatar={<Avatar icon={<Person />} />}
               onClick={this.handlePatientListItem}
             />
            </List>
        );
    } else if (this.state.patientInfoPage) {
      Cmp = () => (
        <div>
          {<DrugSearch metaOnNewRequest={this.metaOnNewRequest} />}

          {this.state.prescriptionPage ?
            <PrescriptionList />            
            : ""
          }


          <h2 style={headerStyle}>Current Rx</h2>
          <Paper >
            <Menu>
              <MenuItem primaryText={this.state.patientMeds.medications[0][0].medication} 
                rightIcon={<ArrowDropRight />}
                  menuItems={[
                    <MenuItem primaryText="Refill" />,
                  ]}
                />
              <MenuItem primaryText={this.state.patientMeds.medications[1][0].medication} 
                rightIcon={<ArrowDropRight />}
                menuItems={[
                  <MenuItem primaryText="Refill" />,
                ]}
              />
            </Menu>
          </Paper>

          {/* TODO: add allergies */}
        </div>
      )
    } else if (this.state.patientInfoPage) {
      Cmp = () => (
        "hi"
      )
    }

    return (
      <MuiThemeProvider>
        <div id="appContainer" className="App">
          <AppBar title={<img src={logo} alt="logo" style={logoStyle} />} iconClassNameRight="muidocs-icon-navigation-expand-more" />
          
          <div id="appContent">
            {<Cmp />}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;