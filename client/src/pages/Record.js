import React from 'react'
import Recorder from 'recorderjs'

import db from '../db'

import './Record.css'

export default class extends React.Component {

  state = {
    entry: null,
    recordStatus: 'stopped',
    playbackStatus: 'stopped'
  }

  handleRecordStart = () => {
    console.log('record')

    this.setState({
      recordStatus: 'recording',
      audioSrc: null
    })
    this.recorder.clear()
    this.recorder.record()
  }

  handleRecordStop = () => {
    console.log('stop')

    this.recorder.stop()
    this.recorder.exportWAV((blob) => {
      this.audioData = blob
      this.setState({
        recordStatus: 'stopped',
        audioSrc: URL.createObjectURL(blob)
      })
    })
  }

  handleSave = () => {
    console.log('save')

    const formData = new FormData()
    formData.append('recording', this.audioData, 'entry.wav')
    fetch('/upload', {
      method: 'post',
      body: formData
    }).then((response) => {
      console.log('response', response)
    })
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const entry = db.entries.find(entry => `${entry.id}` === id)
    if (entry) {
      this.setState({ entry })
    } else {
      this.props.history.replace('/')
    }

    const audioContext = new AudioContext()
    navigator.getUserMedia({ audio: true }, (stream) => {
      const input = audioContext.createMediaStreamSource(stream)
      this.recorder = new Recorder(input)
    }, (error) => {
      console.warn('error', error)
    });
  }

  showRecordStart() {
    return this.state.recordStatus !== 'recording'
  }

  showRecordStop() {
    return this.state.recordStatus === 'recording'
  }

  showSave() {
    return this.state.audioSrc && this.state.recordStatus === 'stopped'
  }

  render() {
    return (
      <div className='container'>
        <div className='content'>
          {this.state.entry && this.state.entry.content.map((item, i) => (
            <div key={i}>{item.truth}</div>
          ))}
        </div>
        <div className='recorder'>
          <div className='record'>
            <h4>Recorder Status: {this.state.recordStatus}</h4>
            {this.showRecordStart() && <button onClick={this.handleRecordStart}>Record</button>}
            {this.showRecordStop() && <button onClick={this.handleRecordStop}>Stop</button>}
          </div>
          {this.state.audioSrc &&
            <div className='playback'>
              <h4>Playback Status: {this.state.playbackStatus}</h4>
              <audio
                src={this.state.audioSrc}
                ref={el => this.audioEl = el}
                onPlaying={() => this.setState({ playbackStatus: 'playing' })}
                onPause={() => this.setState({ playbackStatus: 'paused' })}
                onEnded={() => this.setState({ playbackStatus: 'stopped' })}
                controls
              ></audio>
            </div>}
          <div className='actions'>
            {this.showSave() && <button onClick={this.handleSave}>Save</button>}
          </div>
        </div>
      </div>
    )
  }

}
