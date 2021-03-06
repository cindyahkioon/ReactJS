import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import './fontawesome/css/font-awesome.min.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records : []
    };
  }

  render() {
    return (
      <div>
        <h1>FreeCodeCamp LeaderBoard</h1>
        <RecordsTable records={this.state.records} />
      </div>
    );
  }

  componentDidMount() {
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
    .then( (response) => {
      return response.json()
    })
    .then( (json) => {
      this.setState({
        records: json
      })
    })
   .catch( (ex) => {
      console.log('parsing failed', ex)
   });
  }
}

class RecordsTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      recentSort: "nosort",
      allTimeSort: "nosort"
    };
  }

  handleClick(sortColumn, sortDirection) {
    const sortOrder = ["nosort", "asc", "desc"];

    let newRecentSortOrderIndex =
      (sortOrder.indexOf(sortDirection) + 1) % 3;
    let otherSortColumn = 'recentSort';
    if(sortColumn === 'recentSort') otherSortColumn = 'allTimeSort';
    this.setState({
      [sortColumn]: sortOrder[newRecentSortOrderIndex],
      [otherSortColumn]: "nosort"
    });
  }

  render() {
    return (
      <table>
        <RecordsTableHeader
          recentSort={this.state.recentSort}
          allTimeSort={this.state.allTimeSort}
          onClick={this.handleClick}
        />
        <RecordsTableRows
          records={this.props.records}
          recentSort={this.state.recentSort}
          allTimeSort={this.state.allTimeSort}
        />
      </table>
    );
  }
}

class RecordsTableHeader extends React.Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
  }

  sort(event) {
    this.props.onClick(event.target.getAttribute("id"), event.target.getAttribute("data-order"));
  }

  render() {
    return (
      <thead>
        <tr>
          <th>Rank</th>
          <th>Camper Name</th>
          <th>
            <a href="#"
              id="recentSort"
              data-order={this.props.recentSort}
              onClick={this.sort}
            >
              Points earned in past 30 days
              <i className={`fa fa-sort-${this.props.recentSort}`}></i>
            </a>
          </th>
          <th>
            <a href="#"
              id="allTimeSort"
              data-order={this.props.allTimeSort}
              onClick={this.sort}
            >
              Points earned all-time
              <i className={`fa fa-sort-${this.props.allTimeSort}`}></i>
            </a></th>
        </tr>
      </thead>
    );
  }
}

class RecordsTableRows extends React.Component {
  render() {
    //console.log(this.state.recentSort);
    var recentSort = this.props.recentSort;
    var allTimeSort = this.props.allTimeSort;
   var records = this.props.records;
    records = records.sort(function(a, b) {
      if(recentSort != "nosort") {
        if (recentSort === "asc") {
          return a.recent - b.recent;
        }
        if (recentSort === "desc") {
          return b.recent - a.recent;
        }
      } else if(allTimeSort != "nosort") {
        if (allTimeSort === "asc") {
          return a.alltime - b.alltime;
        }
        if (allTimeSort === "desc") {
          return b.alltime - a.alltime;
        }
      }
    });
    console.log(records);
    var rows = [];
    records.forEach(function(value, index) {
      rows.push(<RecordRow rank={index} record={value} key={value.username} />);
    });

    return <tbody>{rows}</tbody>;
  }
}

class RecordRow extends React.Component {
  render() {
    return (
      <tr>
          <td>{this.props.rank + 1}</td>
          <td className="user">
              <img className="avatar" src={this.props.record.img} />
          <span>{this.props.record.username}</span>
        </td>
        <td>{this.props.record.recent}</td>
        <td>{this.props.record.alltime}</td>
      </tr>
    );
  }
}

ReactDOM.render(<Board />, document.getElementById("main"));
registerServiceWorker();
