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

const PrescriptionList = () => (
  <div>
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
      />
      <ListItem
        leftAvatar={<Avatar icon={<NewReleases />} backgroundColor={yellow600} />}
        rightIcon={<ActionInfo />}
        primaryText="Ramipril"
        secondaryText="New"
      />
    </List>
  </div>
);

export default PrescriptionList;