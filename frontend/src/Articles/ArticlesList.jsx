import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ArticlesService from './ArticlesService';
import {Button, Card, Table} from '@digituz/react-components';

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

  edit(article) {
    this.props.history.push(`/editor/${article._id}`);
  }

  render() {
    const columns = [
      {
        label: 'Title',
        property: 'title',
        type: 'string',
      },
      {
        label: 'Author',
        property: 'author',
        type: 'string',
      },
      {
        label: 'Actions',
        renderer: (article) => (
          <div>
            <Button onClick={() => (this.edit(article))} text="Edit" />
            <Button text="Remove" />
          </div>
        )
      },
    ];
    return (
      <Card className="sm-12 md-10 md-pad-1 lg-8 lg-pad-2" title="Articles">
        <Table columns={columns} data={this.state.articles} />
      </Card>
    );
  }
}

export default withRouter(ArticlesList);
