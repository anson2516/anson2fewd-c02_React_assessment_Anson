import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      searchResults: [],        
      PlaylistName: [], 
      PlaylistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.PlaylistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({PlaylistTracks: tracks})
  }

  removeTrack (track) {
    let tracks = this.state.PlaylistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({ PlaylistTracks: tracks });
  }

  updatePlayListName(name) {
    this.setState({ playListName: name});
  }

  savePlayList() {    
    const trackUris = this.state.PlaylistTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playListName, trackUris).then(()=> {
      this.setState({
        playListName: '',
        PlaylistTracks: trackUris
      })
    })
  }

  search(term){      
      Spotify.search(term).then(searchResults => {        
        this.setState({ searchResults: searchResults })
      })
  }

  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd = {this.addTrack}/>
            <Playlist PlaylistName={this.state.PlaylistName} 
            PlaylistTracks={this.state.PlaylistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlayListName}
            onSave={this.savePlayList} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
