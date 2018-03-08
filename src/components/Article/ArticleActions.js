import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../../agent';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: 'DELETE_ARTICLE', payload })
});

const ArticleActions = props => {
  const { article, canModify } = props;
  const del = () => {
    props.onClickDelete(agent.Articles.del(article.slug))
  };
  if (canModify) {
    return(
      <span>

        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Article
        </button>

      </span>
    );
  }

  return(
    <span />
  );
};

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);