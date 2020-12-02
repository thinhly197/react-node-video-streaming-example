import React, { Component } from "react";

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: this.props.match.params.id,
      videoData: {},
    };
  }
  async componentDidMount() {
    try {
      const res = await fetch(`/video/${this.state.videoId}/data`);
      const data = await res.json();
      this.setState({ videoData: data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* We’ve added crossOrigin="anonymous" to the video element; 
          otherwise, the request for captions will fail.  */}
          <video controls muted autoPlay crossOrigin="anonymous">
            <source
              src={`/video/${this.state.videoId}`}
              type="video/mp4"
            ></source>

            <track
              label="English"
              kind="captions"
              srcLang="en"
              src={`/video/${this.state.videoId}/caption`}
              default
            ></track>
          </video>
          <h1>{this.state.videoData.name}</h1>
        </header>
      </div>
    );
  }
}
