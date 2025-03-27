class Comment {
  constructor(commentID, username, postID, createdAt, content) {
    this.commentID = commentID;
    this.username = username;
    this.postID = postID;
    this.createdAt = createdAt;
    this.content = content;
  }
}

export default Comment;
