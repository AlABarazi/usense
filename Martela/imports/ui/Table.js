
import ReactDataGrid from "react-data-grid";
import React,{Component} from 'react';
import {Helmet} from "react-helmet";
import update from 'immutability-helper';
import { withTracker } from 'meteor/react-meteor-data';
import {Tags} from '../api/tags';
// import ReactDataGridPlugins from 'react-data-grid/addons';






class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: '_id',
        name: 'ID',
        width: 80
      },
      {
        key: 'text',
        name: 'Content',
        width: 300

      },
      {
        key: 'sulotion',
        name: 'Sulotion',
        width: 300,
        editable: true,

      },      {
              key: 'status',
              name: 'Status',
              editable: true,
              width: 70
            },
      {
        key: 'email',
        name: 'Email',
        width: 80

      },
      {
        key: 'room',
        name: 'Room',
        width: 85

      },
      {
        key: 'absURL',
        name: 'URL',
        width:90

      },

      {
        key: 'updatedAt',
        name: 'UpdatedAt',
        width:80

      },
      {
        key: 'reply',
        name: 'Reply',
        width:40

      },
      {
        key: 'category',
        name: 'Category',
        width:80

      }
    ];

    this.state = { rows: [] };
    // this.state = { rows: this.createRows(1000) };
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };
componentWillReceiveProps(nextProps) {
this.setState({ rows:nextProps.tagslist });
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

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
      console.log(rows[i] );
      this.props.meteorCall("tags.update",rows[i])
    }

    this.setState({ rows });

  };

  render() {
    return  (<div style={{fontSize:"0.5rem"}}>
      <Helmet>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous"/>
</Helmet>
<ReactDataGrid
  enableCellSelect={true}
  columns={this._columns}
  rowGetter={this.rowGetter}
  rowsCount={this.state.rows.length}
  minHeight={500}
  onGridRowsUpdated={this.handleGridRowsUpdated} />
    </div>
      );
  }
}

export default withTracker(props => {
const tags = Meteor.subscribe('alltags');
const loading = !tags.ready();
const tagslist =   Tags.find({},{sort: {updatedAt: -1}}).fetch();
const listExists = !loading && !!tagslist;


return {
  meteorCall: Meteor.call,
  tagslist,
  listExists,
};
})((Example));
