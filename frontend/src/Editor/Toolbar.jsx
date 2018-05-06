import React, { Component } from 'react';
import './Toolbar.css';

class Toolbar extends Component {


  render() {
    return (
      <div className="auth0-editor-toolbar">
        <button>List</button>
        <button>Code Block</button>
        <button>Inline Code</button>
        <button>H2</button>
        <button>H3</button>
        <button>H4</button>
      </div>
    );
  }
}

export default Toolbar;
