import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/mode/jsx';
import './CodeEditor.css';

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.className = "auth0-code-editor-modal";
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  render() {
    const value = `import React, {Component} from 'react';
          
class MyComponent extends Component {
  render() {
    return (
      <div>Hello world</div>
    );
  }
}
          
export default MyComponent;`;

    return ReactDOM.createPortal(
      <div className="editor-area">
        <div className="editor-modal">
          <div className="code-editor-toolbar">
            <h3>Code Editor</h3>
            <button>Cancel</button>
            <button>Save</button>
          </div>
          <AceEditor
            mode="jsx"
            theme="monokai"
            value={value}
            width={'100%'}
            height={'300px'}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
          />
        </div>
      </div>,
      this.el,
    );
  }
}

export default CodeEditor;
