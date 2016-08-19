'use strict';

var Container = React.createClass({
  displayName: 'Container',

  getInitialState: function getInitialState() {
    return {
      value: 'Github Markdown Previewer\n\nby [Kate Fedorenko](https://github.com/katie-codes )\n\n# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6\n\nAlternate H1\n======\n\nAlternate H2\n------\n\nBlank line => new paragraph\nTwo trailing spaces => line break without a paragraph\n\nitalics:  *asterisks* or _underscores_.\nbold: **asterisks** or __underscores__.\ndouble trouble: **asterisks and _underscores_**.\nStrikethrough: ~~Scratch this.~~\n\nUnordered list:\n* item\n* object\n* thing\n\nOrdered list\n1. item\n2. object\n3. thing\n',
      markdown: ''
    };
  },
  handleChange: function handleChange(newVal) {
    this.setState({ value: newVal });
    //this.Markdown(newVal);
  },

  Markdown: function Markdown(val) {
    var rawMarkdown = marked(val, { gfm: true, santize: true });
    return { __html: rawMarkdown };
  },

  render: function render() {
    return React.createElement(
      MainComponent,
      { onChange: this.handleChange, value: this.state.value },
      React.createElement('span', { dangerouslySetInnerHTML: this.Markdown(this.state.value) })
    );
  }
});

var MainComponent = React.createClass({
  displayName: 'MainComponent',

  callChange: function callChange() {
    // get value using ref of textarea
    var newVal = ReactDOM.findDOMNode(this.refs.input).value;
    this.props.onChange(newVal);
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-md-6', id: 'main' },
        React.createElement('textarea', { type: 'text', id: 'inputfield', ref: 'input', onChange: this.callChange, value: this.props.value })
      ),
      React.createElement(
        'div',
        { id: 'output', className: 'col-md-6' },
        this.props.children
      )
    );
  }
});

ReactDOM.render(React.createElement(Container, null), document.getElementById("app"));