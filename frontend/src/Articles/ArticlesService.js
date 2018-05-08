import RestFlexClient from '@digituz/rest-flex-client';

class ArticlesService extends RestFlexClient {
  constructor(backendURL) {
    const backendAudience = 'https://articles.digituz.com.br';
    const domain = 'articles';

    const auth0ClientConfig = {
      domain: 'digituz-corp.auth0.com',
      clientID: 'PjEOusUfXhiixQuyqhihGEAMIeF9Eqf3',
      redirectUri: 'http://app.local:3000/callback',
      responseType: 'token id_token',
    };

    super(backendURL, backendAudience, domain, auth0ClientConfig);
  }
}

export default ArticlesService;
