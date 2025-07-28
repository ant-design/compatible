import React, { useState, createElement } from 'react';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import { Comment } from '../../src';

// import { presetPalettes } from '@ant-design/colors'
// console.log(presetPalettes);

// const lines = [];
// Object.keys(presetPalettes).forEach((key) => {
//   for (let i = 0; i < 10; i += 1) {
//   lines.push(`@${key}-${i + 1}: ${presetPalettes[key][i]};`);
//   }
// });

// console.log(lines.join('\n'));

const App: React.FC = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <Comment
      actions={actions}
      author={<a>Han Solo</a>}
      avatar={<Avatar src="https://joesch.moe/api/v1/random" alt="Han Solo" />}
      content={
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully
          and efficiently.
        </p>
      }
      datetime={
        <Tooltip title="2016-11-22 11:22:33">
          <span>8 hours ago</span>
        </Tooltip>
      }
    >
      <Comment
        actions={actions}
        author="Bamboo"
        avatar={<Avatar src="https://joesch.moe/api/v1/random" alt="Bamboo" />}
        content={<p>This is a nest comment</p>}
        datetime="unknown"
      ></Comment>
    </Comment>
  );
};

export default App;
