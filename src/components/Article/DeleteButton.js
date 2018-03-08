import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

const mapDispatchToProps = dispatch => ({
  onClick: (payload, commentId) =>
    dispatch({ type: 'DELETE_COMMENT', payload, commentId })
});

const DeleteButton = props => {
  const del = () => {
    const { slug, commentId } = props;
    const payload = agent.Comments.delete(slug, commentId);
    props.onClick(payload, props.commentId);
  };

  if (props.show) {
    return (
      <span>
        <i className='ion-trash-a' onClick={del}></i>
      </span>
    )
  }

  return null;
};

export default connect(() => ({}), mapDispatchToProps)(DeleteButton);

