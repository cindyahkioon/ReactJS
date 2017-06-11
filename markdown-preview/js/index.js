"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MarkDownPreviewer = function (_React$Component) {
  _inherits(MarkDownPreviewer, _React$Component);

  function MarkDownPreviewer(props) {
    _classCallCheck(this, MarkDownPreviewer);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      inputText: _this.props.text
    };

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  MarkDownPreviewer.prototype.handleChange = function handleChange(event) {
    this.setState({ inputText: event.target.value });
  };

  MarkDownPreviewer.prototype.render = function render() {
    return React.createElement(
      "div",
      { id: "wrapper" },
      React.createElement(MarkDownInput, { value: this.state.inputText, onChange: this.handleChange }),
      React.createElement(MarkDownOutput, { output: this.state.inputText })
    );
  };

  return MarkDownPreviewer;
}(React.Component);

var MarkDownInput = function (_React$Component2) {
  _inherits(MarkDownInput, _React$Component2);

  function MarkDownInput() {
    _classCallCheck(this, MarkDownInput);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  MarkDownInput.prototype.render = function render() {
    return React.createElement(
      "textarea",
      { className: "input", onChange: this.props.onChange },
      this.props.value
    );
  };

  return MarkDownInput;
}(React.Component);

var MarkDownOutput = function (_React$Component3) {
  _inherits(MarkDownOutput, _React$Component3);

  function MarkDownOutput() {
    _classCallCheck(this, MarkDownOutput);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  MarkDownOutput.prototype.parseMarkup = function parseMarkup(rawInput) {
    var rawMarkup = marked(rawInput, { gfm: true, sanitize: true });
    return { __html: rawMarkup };
  };

  MarkDownOutput.prototype.render = function render() {
    return React.createElement("div", { className: "output", dangerouslySetInnerHTML: this.parseMarkup(this.props.output) });
  };

  return MarkDownOutput;
}(React.Component);

var previewText = '# Heading\n\n ## Sub-heading\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*';

ReactDOM.render(React.createElement(MarkDownPreviewer, { text: previewText }), document.getElementById('markpreview'));