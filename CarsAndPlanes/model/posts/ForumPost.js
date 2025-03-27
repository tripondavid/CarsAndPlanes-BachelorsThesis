const postType = "ForumPost";

class ForumPost {
  constructor(forumPostID, username, createdAt, content, mediaFileURL) {
    this.forumPostID = forumPostID;
    this.username = username;
    this.createdAt = createdAt;
    this.content = content;
    this.mediaFileURL = mediaFileURL;
    this.postType = postType;
  }
}

export default ForumPost;
