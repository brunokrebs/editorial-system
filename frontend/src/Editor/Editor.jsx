import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Editor.css';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {
        __html: props.content,
      },
    };
  }

  render() {
    return (
      <div
        className="auth0-editor"
        onBlur={(event) => {this.props.onBlur(event.target.innerHTML)}}
        contentEditable={true}
        dangerouslySetInnerHTML={this.state.content}
      />
    );
  }
}

Editor.propTypes = {
  content: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default Editor;
