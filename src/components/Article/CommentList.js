import React from 'react';
import Comment from './Comment';

const CommentList = props => {
  return(
    <div>
      {
        props.comments.map(comment => {
          return(
            <Comment
              key={comment.id}
              comment={comment}
              currentUser={props.currentUser}
              slug={props.slug}/>
          )
        })
      }
    </div>
  )
};

export default CommentList;