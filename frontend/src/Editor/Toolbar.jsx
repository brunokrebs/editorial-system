import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TurndownService from 'turndown';
import './Toolbar.css';

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.turndownService = new TurndownService({
      headingStyle: 'atx',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced',
    });

    this.export = this.export.bind(this);
    this.toggleH2 = this.toggleH2.bind(this);
  }

  toggleH2() {
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);
    const {parentNode} = range.commonAncestorContainer;

    // we don't want to transform a (e.g.) LI into a
    if (parentNode.tagName !== 'DIV') {
      return;
    }

    // this happens when user selects content from more than
    // one paragraph
    if (sel.type === 'Range' && parentNode.classList.contains('auth0-editor')) {
      return;
    }

    if (sel.type === 'Caret') {
      const h2 = document.createElement('h2');
      h2.innerText = 'H2 Title';
      range.insertNode(h2);
      this.props.focusBack();
    }
  }

  export() {
    const markdown = this.turndownService.turndown(this.props.editorRef.current.innerHTML);

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(markdown));
    element.setAttribute('download', 'my-first-article.md');
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
  }

  render() {
    return (
      <div className="auth0-editor-toolbar">
        <button>UL</button>
        <button>OL</button>
        <button>CB</button>
        <button>IC</button>
        <button onClick={this.toggleH2}>H2</button>
        <button>H3</button>
        <button>H4</button>
        <button onClick={this.props.onSave}>S</button>
        <button onClick={this.export}>E</button>
      </div>
    );
  }
}

Toolbar.propTypes = {
  editorRef: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  focusBack: PropTypes.func.isRequired,
};

export default Toolbar;
