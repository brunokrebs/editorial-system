import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TurndownService from 'turndown';
import CodeEditor from '../CodeEditor/CodeEditor';
import './Editor.css';
import Toolbar from './Toolbar';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {
        __html: props.content,
      },
      showEditor: false,
      code: '',
    };

    this.turndownService = new TurndownService({
      headingStyle: 'atx',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced',
    });

    this.keyDown = this.keyDown.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.editorClicked = this.editorClicked.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
    this.onSaveCodeEditor = this.onSaveCodeEditor.bind(this);

    this.editorRef = React.createRef();
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

  editorClicked(event) {
    const {tagName, className} = event.target;
    const isCodeElement = tagName === 'PRE' || tagName === 'CODE';
    const isCodeBlock = isCodeElement && className.indexOf('code-editor') > -1;
    if (isCodeBlock) {
      this.codeBlockBeingEdited = event.target;
      this.setState({
        showEditor: true,
        code: event.target.innerText,
      });
    }
  }

  closeEditor() {
    this.setState({
      showEditor: false,
    });
  }

  onSaveCodeEditor(code) {
    this.codeBlockBeingEdited.innerText = code;
    this.setState({
      content: {
        __html: this.editorRef.current.innerHTML,
      },
      showEditor: false,
    });
  }

  onSaveEditor() {
    this.props.onSave(this.editorRef.current.innerHTML);
  }

  onPaste(event) {
    const file = event.clipboardData.items[0].getAsFile();
    const reader = new FileReader();
    reader.onload = (evt) => {
      const sel = window.getSelection();
      const range = sel.getRangeAt(0);
      range.deleteContents();

      const img = document.createElement('img');
      img.src = evt.target.result;

      range.insertNode(img);
    };
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="auth0-editor-wrapper">
        <Toolbar onSave={() => {this.onSaveEditor()}} />
        <div
          className="auth0-editor"
          onBlur={(event) => {this.onBlur(event.target.innerHTML)}}
          contentEditable={true}
          dangerouslySetInnerHTML={this.state.content}
          onKeyDown={this.keyDown}
          onClick={this.editorClicked}
          onPaste={this.onPaste}
          ref={this.editorRef}
        />
        {
          this.state.showEditor &&
          <CodeEditor
            onCancel={this.closeEditor}
            onSave={this.onSaveCodeEditor}
            code={this.state.code}
          />
        }
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
