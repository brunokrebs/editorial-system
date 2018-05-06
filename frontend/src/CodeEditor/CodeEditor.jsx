import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/mode/jsx';
import './CodeEditor.css';

class CodeEditor extends Component {
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
    this.el.className = 'auth0-code-editor-modal';

    this.state = {
      code: props.code,
    };

    this.updateCode = this.updateCode.bind(this);
  }

  updateCode(code) {
    this.setState({
      code,
    });
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="editor-area">
        <div className="editor-modal">
          <div className="code-editor-toolbar">
            <h3>Code Editor</h3>
            <button onClick={this.props.onCancel}>Cancel</button>
            <button onClick={() => {this.props.onSave(this.state.code)}}>Save</button>
          </div>
          <AceEditor
            mode="jsx"
            theme="monokai"
            value={this.state.code}
            width={'100%'}
            height={'300px'}
            onChange={this.updateCode}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
          />
        </div>
      </div>,
      this.el,
    );
  }
}

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default CodeEditor;
