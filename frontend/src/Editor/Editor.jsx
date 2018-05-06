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
  }

  onBlur(html) {
    console.log(html);
    const markdown = this.turndownService.turndown(html);
    console.log(markdown);
    this.props.onBlur(markdown);
  }

  render() {
    return (
      <div className="auth0-editor-wrapper">
        <Toolbar />
        <div
          className="auth0-editor"
          onBlur={(event) => {this.onBlur(event.target.innerHTML)}}
          contentEditable={true}
          dangerouslySetInnerHTML={this.state.content}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  content: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default Editor;
