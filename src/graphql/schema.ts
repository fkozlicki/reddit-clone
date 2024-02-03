import { builder } from './builder';
import './types/User';
import './types/Vote';
import './types/CommentVote';
import './types/Comment';
import './types/Community';
import './types/Post';
import './types/Topic';
import './types/Conversation';
import './types/Message';

export const schema = builder.toSchema();
