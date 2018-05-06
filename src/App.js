import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import AppBar from 'material-ui/AppBar';

import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import AutoComplete from 'material-ui/AutoComplete';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import logo from './logo.svg';
import './App.css';

import PatientClient from './PatientClient';

const headerStyle = {
    display: 'block',
    textAlign: 'left'
};

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
    }

    this.renderPatientListItem = this.renderPatientListItem.bind(this);
    this.handlePatientListItem = this.handlePatientListItem.bind(this);

    this.renderPatientMeds = this.renderPatientMeds.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
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

  handleUpdateInput(value) {
    this.setState({
      dataSource: ['Lisinopril','Exemestane','Lithane','Lisdexmfetamine','Dimesylate'],
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
                primaryText={this.state.patient.firstname}
                leftIcon={<ActionGrade color={pinkA200} />}
                rightAvatar={<Avatar src="images/chexee-128.jpg" />}
                onClick={this.handlePatientListItem} 
              />
            </List>
        );
    } else if (this.state.patientInfoPage) {
      Cmp = () => (
        <div>
          <AutoComplete
            hintText="Type anything"
            dataSource={this.state.dataSource}
            onUpdateInput={this.handleUpdateInput}
            floatingLabelText="Search Rx"
            fullWidth={true}
          />

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
    }

    return (
      <MuiThemeProvider>
        <div id="appContainer" className="App">
          <AppBar title="MEDJOY" iconClassNameRight="muidocs-icon-navigation-expand-more" />

          {<Cmp />}
          
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;