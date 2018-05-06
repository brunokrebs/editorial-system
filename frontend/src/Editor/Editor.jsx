import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TurndownService from 'turndown';
import './Editor.css';
import Toolbar from "./Toolbar";

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {
        __html: props.content,
      },
    };

    this.turndownService = new TurndownService({
      headingStyle: 'atx',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced',
    });

    this.keyDown = this.keyDown.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  keyDown(event) {
    if (event.key === 'Tab') {
      return event.preventDefault();
    }
  }

  onBlur(html) {
    const markdown = this.turndownService.turndown(html);
    this.props.onBlur(markdown);
  }

  render() {
    return (
      <div className="auth0-editor-wrapper">
        <Toolbar onSave={this.props.onSave} />
        <div
          className="auth0-editor"
          onBlur={(event) => {this.onBlur(event.target.innerHTML)}}
          contentEditable={true}
          dangerouslySetInnerHTML={this.state.content}
          onKeyDown={this.keyDown}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  content: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Editor;
