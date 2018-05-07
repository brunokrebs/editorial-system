import React, { Component } from 'react';
import Editor from './Editor/Editor';
import {Route} from 'react-router-dom';
import * as Auth0 from '@digituz/auth0-web';
import ArticlesList from './Articles/ArticlesList';
import FakeArticle from './FakeArticle';
import Callback from './Callback/Callback';

class App extends Component {
  constructor(props) {
    super(props);

    this.auth0Config = {
      domain: 'digituz-corp.auth0.com',
      clientID: 'PjEOusUfXhiixQuyqhihGEAMIeF9Eqf3',
      redirectUri: 'http://app.local:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile'
    };

    Auth0.configure(this.auth0Config);

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
    const content = FakeArticle;

    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <div>
            <button onClick={Auth0.signIn}>Sign In</button>
          </div>
        )}/>
        <Route exact path='/articles' render={() => (
          <ArticlesList />
        )}/>
        <Route path='/callback' component={Callback} />
        <Route exact path='/editor' render={() => (
          <Editor content={content} onBlur={this.contentChange} onSave={this.save} />
        )}/>
      </div>
    );
  }
}

export default App;
