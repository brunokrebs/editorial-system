import React, {Component} from 'react';
import ArticlesService from './ArticlesService';

class ArticlesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };

    const backendURL = 'http://localhost:3001';
    this.articlesService = new ArticlesService(backendURL);
  }

  componentWillMount() {
    this.articlesService.get().then((articles) => {
      this.setState({
        articles,
      });
    }).catch(alert);
  }

  render() {
    return (
      <h1>{this.state.articles.length}</h1>
    );
  }
}

export default ArticlesList;
