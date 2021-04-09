import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import {FormControl, FormLabel, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import List, {ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';

import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import PrivateHeader from './PrivateHeader';
import InfoBar from './InfoBar';
import FlatButtonMenu from './FlatButtonMenu';
import ReactDataGrid from "react-data-grid";

import {Helmet} from "react-helmet";
import update from 'immutability-helper';
import {withTracker} from 'meteor/react-meteor-data';
import {Tags} from '../api/tags';

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: '_id',
        name: 'ID',

      },
      {
        key: 'text',
        name: 'Content',
        editable: true


      },
      {
        key: 'sulotion',
        name: 'Sulotion'

      },      {
              key: 'status',
              name: 'Status'
            },
      {
        key: 'room',
        name: 'Room'

      },
      {
        key: 'absURL',
        name: 'URL'

      }
    ];

    this.state = {
      rows: []
    };
    // this.state = { rows: this.createRows(1000) };
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };
  componentWillReceiveProps(nextProps) {
    this.setState({rows: nextProps.tagslist});
  }
  createRows = (numberOfRows) => {
    let rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        id: i,
        task: 'Task ' + i,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
      });
    }
    return rows;
  };

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  handleGridRowsUpdated = ({fromRow, toRow, updated}) => {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
      console.log(rows[i]);
      this.props.meteorCall("tags.update", rows[i])
    }

    this.setState({rows});

  };
  render() {
    const {classes} = this.props;
    return (<Grid container="container" className={classes.root}>
      {Session.get('currentPagePrivacy') === "auth" && <PrivateHeader/>}
      {Session.get('currentPagePrivacy') === "auth" && <InfoBar/>}
      {Session.get('currentPagePrivacy') === "auth" && <FlatButtonMenu/>}

      <Grid container="container" className={classes.root}>
        <Grid xs={12} item="item">
          <div style={{
              fontSize: "0.5rem"
            }}>
            <Helmet>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous"/>
            </Helmet>
            <ReactDataGrid enableCellSelect={true} columns={this._columns} rowGetter={this.rowGetter} rowsCount={this.state.rows.length} minHeight={500} onGridRowsUpdated={this.handleGridRowsUpdated}/>
          </div>
        </Grid>
      </Grid>
    </Grid>)
    }
  }

Example.propTypes = {classes: PropTypes.object.isRequired};

export default withTracker(props => {
const tags = Meteor.subscribe('alltags');
const loading = !tags.ready();
const tagslist =   Tags.find({userId:Meteor.userId()},{sort: {updatedAt: -1}}).fetch();
const listExists = !loading && !!tagslist;


return {
  meteorCall: Meteor.call,
  tagslist,
  listExists,
};
})(withStyles(styles)(Example));
