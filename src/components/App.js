import React from "react";
import "./app.css";

class App extends React.Component {
  state = { posts: [], post: { title: "", content: "" } };

  componentDidMount() {
    this.getPosts();
  }

  getPosts = (_) => {
    fetch("/posts")
      .then((response) => response.json())
      .then((response) => this.setState({ posts: response.data }))
      .catch((err) => console.error(err));
  };

  addPost = (_) => {
    const { post } = this.state;
    fetch(`/posts/add?title=${post.title}&content=${post.content}`)
      .then(this.getPosts)
      .catch((err) => console.error(err));
    this.setState({ post: { title: "", content: "" } });
  };

  deletePost = (e) => {
    const postId = e.target.value;
    fetch(`/posts/delete?id=${postId}`)
      .then(this.getPosts)
      .catch((err) => console.error(err));
  };

  renderPost = ({ id, title, content }) => (
    <div key={id} className="ui raised segment">
      <h4>{title}</h4>
      <p>{content}</p>
      <button
        className="mini ui button medium postButton"
        onClick={this.deletePost}
        value={id}
      >
        Delete
      </button>
    </div>
  );

  render() {
    const { posts, post } = this.state;
    return (
      <div className="ui stacked segment main">
        <div className="ui stacked segment header-sect">
          <label htmlFor="title">Title</label>
          <br></br>
          <div class="ui fluid input top">
            <input
              name="title"
              type=""
              value={post.title}
              onChange={(e) =>
                this.setState({ post: { ...post, title: e.target.value } })
              }
            />
          </div>
          <label htmlFor="content">Content</label>
          <br></br>
          <div class="ui form top">
            <textarea
              name="content"
              value={post.content}
              onChange={(e) =>
                this.setState({ post: { ...post, content: e.target.value } })
              }
            />
          </div>
          <br></br>

          <button
            className="ui button medium right floated"
            onClick={this.addPost}
          >
            Add Blote
          </button>
        </div>
        {posts.map(this.renderPost)}
      </div>
    );
  }
}

export default App;
