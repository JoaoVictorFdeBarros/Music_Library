import './Track.css';
import React, { Component } from 'react';
import eventEmitter from './EventEmitter';

class Track extends Component {
    static currentTrack = null;

    constructor(props) {
        super(props);
        this.audioRef = React.createRef();
        this.state = {
            isPlaying: false,
        };        
    }

    componentDidMount() {
        this.audioRef.current.addEventListener('ended', this.handleEnded);
        eventEmitter.on('trackChanged', this.updatePlayingState);
    }

    componentWillUnmount() {
        this.audioRef.current.removeEventListener('ended', this.handleEnded);
        eventEmitter.off('trackChanged', this.updatePlayingState);
    }

    handleEnded = () => {
        eventEmitter.emit('trackChanged', null); 
    };

    handleClick = () => {
        if (!this.audioRef.current.src) {
            this.audioRef.current.src = this.props.Track.preview;
        }

        if (Track.currentTrack === this.audioRef.current) {
            if (this.audioRef.current.paused) {
                eventEmitter.emit('trackChanged', this.audioRef.current);
                this.audioRef.current.play();
            } else {
                eventEmitter.emit('trackChanged', null);
                this.audioRef.current.pause();
            }
        } else {
            if (Track.currentTrack !== null) {
                Track.currentTrack.pause();
            }
            eventEmitter.emit('trackChanged', this.audioRef.current);
            this.audioRef.current.play();
        }
    };

    updatePlayingState = () => {
        if (Track.currentTrack === this.audioRef.current) {
            this.setState({ isPlaying: true });
        } else {
            this.setState({ isPlaying: false });
        }
    };
    
    render() {
        return (
            <div className='Track' onClick={this.handleClick}>
                <div className={this.state.isPlaying ? 'VisibleCircle': 'Circle'}/>
                <img className={this.state.isPlaying ? 'playing' : ''}  src= { this.props.Resolution === 'medium' ? this.props.Track.album.cover_medium : this.props.Track.album.cover_big} alt={this.props.Track.title} />
                <p className='Title'>{this.props.Track.title}</p>
                {this.props.type === 'Artist' ? null : <p className='Subtitle'>{this.props.Track.artist.name}</p>}
                <audio ref={this.audioRef} data-id={this.props.Track.id}>
                    <source type="audio/mpeg" />
                </audio>
            </div>
        );
    }
}

export default Track;
