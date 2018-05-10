import React, { Component } from 'react';
import Editor from './Editor/Editor';
import {Route, withRouter} from 'react-router-dom';
import * as Auth0 from '@digituz/auth0-web';
import ArticlesList from './Articles/ArticlesList';
import FakeArticle from './FakeArticle';
import Callback from './Callback/Callback';
import ArticlesService from './Articles/ArticlesService';
import * as Components from '@digituz/react-components';
import './App.css';

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

    const backendURL = 'http://localhost:3001';
    this.articlesService = new ArticlesService(backendURL);
  }

  contentChange(content) {
    this.setState({
      content,
    });
  }

  save() {
    this.articlesService.insert({
      title: 'My Article',
      author: 'Bruno Krebs',
      content: this.state.content,
    });
  }

  go(url) {
    this.props.history.push(url);
  }

  guardedRoute(url) {
    if (Auth0.isAuthenticated()) return this.go(url);
    Components.NotificationManager.warning('Sign in first, please.');
  }

  signIn = Auth0.signIn;

  signOut = () => {
    Auth0.signOut({
      returnTo: `${window.location.origin}`,
      clientID: '86fnC4Rb8NsAB4feVuAyS44WDRvB5KbP',
    })
  };

  render() {
    const content = FakeArticle;

    const divStyle = {
      display: 'grid',
      gridTemplateColumns: '45px 1fr auto',
    };

    const submenus = [{
      title: 'Menu',
      items: [
        { title: 'Home', color: '#e6665b', onClick: () => { this.guardedRoute('/') } },
        { title: 'Articles', color: '#66ad66', onClick: () => { this.guardedRoute('/articles') } },
        { title: 'Editor', color: '#5e5eff', onClick: () => { this.guardedRoute('/editor') } },
      ]
    }];

    return (
      <Components.Panel>
        <Components.PanelHeader>
          <div style={divStyle}>
            <Components.VerticalMenu submenus={submenus} />
            <h1 onClick={() => { this.go('/') }}>Auth0 Editorial System</h1>
            <div className="horizontal-menu">
              <Components.If condition={!Auth0.isAuthenticated()}>
                <Components.Button onClick={this.signIn} text="Sign In" />
              </Components.If>
              <Components.If condition={Auth0.isAuthenticated()}>
                <Components.Button onClick={this.signOut} text="Sign Out" />
              </Components.If>
            </div>
          </div>
        </Components.PanelHeader>
        <Components.PanelBody>
          <Route exact path="/" render={() => (
            <div>
              <h1>Hey there</h1>
            </div>
          )} />
          <Route path="/callback" component={Callback} />
          <Route exact path='/' render={() => (
            <div>

            </div>
          )}/>
          <Route exact path='/articles' render={() => (
            <ArticlesList />
          )}/>
          <Route exact path='/editor' render={() => (
            <Editor content={content} onBlur={this.contentChange} onSave={this.save} />
          )}/>
        </Components.PanelBody>
        <Components.NotificationContainer />
      </Components.Panel>
    );
  }
}

export default withRouter(App);
