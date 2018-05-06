import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Toolbar.css';

class Toolbar extends Component {
  render() {
    return (
      <div className="auth0-editor-toolbar">
        <button>UL</button>
        <button>OL</button>
        <button>CB</button>
        <button>IC</button>
        <button>H2</button>
        <button>H3</button>
        <button>H4</button>
        <button onClick={this.props.onSave}>S</button>
      </div>
    );
  }
}

Toolbar.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default Toolbar;
