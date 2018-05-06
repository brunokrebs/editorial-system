import React, { Component } from 'react';
import Editor from './Editor/Editor';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };

    this.contentChange = this.contentChange.bind(this);
    this.save = this.save.bind(this);
  }

  contentChange(content) {
    this.setState({
      content,
    });
  }

  save() {
    console.log(this.state.content);
  }

  render() {
    const content = `
      <h1>testing</h1>
      <div>This is some paragraph. Morbi in ornare felis, porta facilisis risus. Aliquam eu dolor feugiat, rhoncus metus vel, dapibus turpis. Vestibulum facilisis est elit, eu elementum libero sodales at. Nunc id lacinia mi.</div>
      <div>This is another paragraph. Fusce a sodales est. Proin ultrices eros mauris, ac aliquet ligula dapibus sit amet. Duis aliquam convallis semper. Donec viverra orci vitae nunc fermentum interdum. Suspendisse ornare ligula id odio venenatis, quis congue elit fringilla.</div>
      <ul>
        <li>Item number one, although it's not numbered.</li>
        <li>Item number two (still not numbered).</li>
      </ul>
      <div>Another paragraph. This one exists to show how an <code>inline code</code> works and to precede a code block:</div>
      <pre class="code-editor" contenteditable="false"><code class="language-js code-editor">import React, {Component} from 'react';
          
class MyComponent extends Component {
  render() {
    return (
      "Hello world"
    );
  }
}
          
export default MyComponent;</code></pre>
      <div>This is the last paragraph. Awesome, right?</div>
    `;

    return (
      <div className="App">
        <Editor content={content} onBlur={this.contentChange} onSave={this.save} />
      </div>
    );
  }
}

export default App;
