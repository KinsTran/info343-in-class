import React from "react";

const IMAGE_URL = "http://image.tmdb.org/t/p/w154";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h2>{this.props.movie.title}</h2>
                <img src={IMAGE_URL + this.props.movie.poster_path} alt=""/>
                <p>{this.props.movie.overview}</p>
            </div>
        )
    }
}