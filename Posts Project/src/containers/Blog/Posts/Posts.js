import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../../components/Post/Post';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null
    };

    componentWillMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts/')
        .then((response) => {
            this.setState({ posts: response.data.slice(0, 4) });
        });
    }

    onPostSelected = (id) => {
        this.setState({ selectedPostId : id });
    }

    render() {
        let posts = this.state.posts.map((post) => {
            return <Post 
                        key={post.id} 
                        title={post.title} 
                        author={post.author}
                        onClicked={() => this.onPostSelected(post.id)}/>
        });
        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;