import React, { Component } from 'react';
import Editor from './Editor/Editor';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };

    this.contentChange = this.contentChange.bind(this);
  }

  contentChange(content) {
    this.setState({
      content,
    });
  }

  render() {
    const content = '<h1>testing</h1>';

    const textareaStyle = {
      width: '100%',
      minHeight: '300px',
      resize: 'vertical',
    };

    return (
      <div className="App">
        <Editor content={content} onBlur={this.contentChange} />
        <textarea style={textareaStyle} value={this.state.content} />
      </div>
    );
  }
}

export default App;
