import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import WhatsHot from 'material-ui/svg-icons/social/whatshot';
import NewReleases from 'material-ui/svg-icons/av/new-releases';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Slider from 'material-ui/Slider';


export default class PrescriptionList extends React.Component {
  state = {
    open: false,
    open2: false,
    snackBarOpen: false,
    firstSlider: 10,
  };

  handleFirstSlider = (event, value) => {
    this.setState({firstSlider: value});
  };

  handleOpen = () => {
    this.setState({
      open: true,
      open2: false,
    });
  };

  handleOpen2 = () => {
    this.setState({
      open: false,
      open2: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  handleClose2 = () => {
    this.setState({
      open2: false,
      snackBarOpen: true
    });
  };

  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    const actions2 = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose2}
      />,
    ];

    return (
      <div>
        {this.state.firstSlider + 'mg'}
        <Slider min={1} max={100} step={5} defaultValue={5} style={{width: 200}} value={this.state.firstSlider} onChange={this.handleFirstSlider} />
        <List>
          <Subheader inset={false}>Results Rx</Subheader>
          <ListItem
            leftAvatar={<Avatar />}
            rightIcon={<ActionInfo />}
            primaryText="Lisinopril"
            secondaryText="Generic"
          />
          <ListItem
            leftAvatar={<Avatar />}
            rightIcon={<ActionInfo />}
            primaryText="Lisinopril"
            secondaryText="Branded"
          />
        </List>
        <Divider inset={true} />
        <List>
          <Subheader inset={false}>Trending Rx</Subheader>
          <ListItem
            leftAvatar={<Avatar icon={<WhatsHot />} backgroundColor={blue500} />}
            rightIcon={<ActionInfo />}
            primaryText="Benazepril"
            secondaryText="Trending"
            onClick={this.handleOpen}
          />
          <ListItem
            leftAvatar={<Avatar icon={<NewReleases />} backgroundColor={yellow600} />}
            rightIcon={<ActionInfo />}
            primaryText="Ramipril"
            secondaryText="New"
            onClick={this.handleOpen2}
          />
        </List>
        <Dialog
              title="Gene Recommendation"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              This patient has gene-GDF5.  Patients with this gene tend to have better results with this medication.
          </Dialog>
        <Dialog
              title="Authorize e-Prescription"
              actions={actions2}
              modal={false}
              open={this.state.open2}
              onRequestClose={this.handleClose}
            >
              Prescribe this medication.
          </Dialog>
        <Snackbar
          open={this.state.snackBarOpen}
          message="Processing e-Prescription"
          autoHideDuration={4000}
        />
      </div>
    );
  }
}