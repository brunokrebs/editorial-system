import React, {Component} from 'react';
import RestFlexClient from '@digituz/rest-flex-client';

class ArticlesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };


    const auth0ClientConfig = {
      domain: 'digituz-corp.auth0.com',
      clientID: 'PjEOusUfXhiixQuyqhihGEAMIeF9Eqf3',
      redirectUri: 'http://app.local:3000/callback',
      responseType: 'token id_token',
    };

    const baseUrl = 'http://localhost:3001';
    const backendAudience = 'https://articles.digituz.com.br';

    this.restFlexClient = new RestFlexClient(baseUrl, backendAudience, 'articles', auth0ClientConfig);
  }

  componentWillMount() {
    this.restFlexClient.get().then((articles) => {
      this.setState({
        articles,
      });
    }).catch(alert);
  }

  render() {
    return (
      <h1>cool</h1>
    )
  }
}

export default ArticlesList;
