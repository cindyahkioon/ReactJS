'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      records: []
    };
    return _this;
  }

  Board.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'FreeCodeCamp LeaderBoard'
      ),
      React.createElement(RecordsTable, { records: this.state.records })
    );
  };

  Board.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then(function (response) {
      return response.json();
    }).then(function (json) {
      _this2.setState({
        records: json
      });
    }).catch(function (ex) {
      console.log('parsing failed', ex);
    });
  };

  return Board;
}(React.Component);

var RecordsTable = function (_React$Component2) {
  _inherits(RecordsTable, _React$Component2);

  function RecordsTable(props) {
    _classCallCheck(this, RecordsTable);

    var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this3.handleClick = _this3.handleClick.bind(_this3);
    _this3.state = {
      recentSort: "nosort",
      allTimeSort: "nosort"
    };
    return _this3;
  }

  RecordsTable.prototype.handleClick = function handleClick(sortColumn, sortDirection) {
    var _setState;

    var sortOrder = ["nosort", "asc", "desc"];

    var newRecentSortOrderIndex = (sortOrder.indexOf(sortDirection) + 1) % 3;
    var otherSortColumn = 'recentSort';
    if (sortColumn == 'recentSort') otherSortColumn = 'allTimeSort';
    this.setState((_setState = {}, _setState[sortColumn] = sortOrder[newRecentSortOrderIndex], _setState[otherSortColumn] = "nosort", _setState));
  };

  RecordsTable.prototype.render = function render() {
    return React.createElement(
      'table',
      null,
      React.createElement(RecordsTableHeader, {
        recentSort: this.state.recentSort,
        allTimeSort: this.state.allTimeSort,
        onClick: this.handleClick
      }),
      React.createElement(RecordsTableRows, {
        records: this.props.records,
        recentSort: this.state.recentSort,
        allTimeSort: this.state.allTimeSort
      })
    );
  };

  return RecordsTable;
}(React.Component);

var RecordsTableHeader = function (_React$Component3) {
  _inherits(RecordsTableHeader, _React$Component3);

  function RecordsTableHeader(props) {
    _classCallCheck(this, RecordsTableHeader);

    var _this4 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this4.sort = _this4.sort.bind(_this4);
    return _this4;
  }

  RecordsTableHeader.prototype.sort = function sort(event) {
    this.props.onClick(event.target.getAttribute("id"), event.target.getAttribute("data-order"));
  };

  RecordsTableHeader.prototype.render = function render() {
    return React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'th',
          null,
          'Rank'
        ),
        React.createElement(
          'th',
          null,
          'Camper Name'
        ),
        React.createElement(
          'th',
          null,
          React.createElement(
            'a',
            { href: '#',
              id: 'recentSort',
              'data-order': this.props.recentSort,
              onClick: this.sort
            },
            'Points earned in past 30 days',
            React.createElement('i', { className: 'fa fa-sort-' + this.props.recentSort })
          )
        ),
        React.createElement(
          'th',
          null,
          React.createElement(
            'a',
            { href: '#',
              id: 'allTimeSort',
              'data-order': this.props.allTimeSort,
              onClick: this.sort
            },
            'Points earned all-time',
            React.createElement('i', { className: 'fa fa-sort-' + this.props.allTimeSort })
          )
        )
      )
    );
  };

  return RecordsTableHeader;
}(React.Component);

var RecordsTableRows = function (_React$Component4) {
  _inherits(RecordsTableRows, _React$Component4);

  function RecordsTableRows() {
    _classCallCheck(this, RecordsTableRows);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  RecordsTableRows.prototype.render = function render() {
    //console.log(this.state.recentSort);
    var recentSort = this.props.recentSort;
    var allTimeSort = this.props.allTimeSort;

    this.props.records.sort(function (a, b) {
      if (recentSort != "nosort") {
        if (recentSort === "asc") {
          return a.recent - b.recent;
        }
        if (recentSort === "desc") {
          return b.recent - a.recent;
        }
      } else if (allTimeSort != "nosort") {
        if (allTimeSort === "asc") {
          return a.alltime - b.alltime;
        }
        if (allTimeSort === "desc") {
          return b.alltime - a.alltime;
        }
      }
    });
    var records = this.props.records;
    var rows = [];
    records.forEach(function (value, index) {
      rows.push(React.createElement(RecordRow, { rank: index, record: value, key: value.username }));
    });

    return React.createElement(
      'tbody',
      null,
      rows
    );
  };

  return RecordsTableRows;
}(React.Component);

var RecordRow = function (_React$Component5) {
  _inherits(RecordRow, _React$Component5);

  function RecordRow() {
    _classCallCheck(this, RecordRow);

    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }

  RecordRow.prototype.render = function render() {
    return React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        null,
        this.props.rank + 1
      ),
      React.createElement(
        'td',
        { className: 'user' },
        React.createElement('img', { className: 'avatar', src: this.props.record.img }),
        React.createElement(
          'span',
          null,
          this.props.record.username
        )
      ),
      React.createElement(
        'td',
        null,
        this.props.record.recent
      ),
      React.createElement(
        'td',
        null,
        this.props.record.alltime
      )
    );
  };

  return RecordRow;
}(React.Component);

var campers = [{
  username: "diomed",
  img: "https://avatars3.githubusercontent.com/u/72777?v=3",
  alltime: 4473,
  recent: 552,
  lastUpdate: "2017-06-05T09:45:15.687Z"
}, {
  username: "sjames1958gm",
  img: "https://avatars.githubusercontent.com/u/4639625?v=3",
  alltime: 7225,
  recent: 510,
  lastUpdate: "2017-05-31T10:27:51.438Z"
}, {
  username: "anthonygallina1",
  img: "https://avatars.githubusercontent.com/u/11003055?v=3",
  alltime: 4878,
  recent: 495,
  lastUpdate: "2017-06-06T17:52:05.145Z"
}];

ReactDOM.render(React.createElement(Board, null), document.getElementById("main"));
