import _ from 'lodash'
import React from 'react'
import moment from 'moment'

import './Entry.css'

class Item extends React.Component {

  static defaultProps = {
    item: {}
  }

  state = {
    problem: '',
    flipped: '',
    truth: ''
  }

  handleChange = (newItem) => {
    this.setState(newItem, () => this.props.onChange(this.state))
  }

  componentDidMount() {
    this.setState({
      problem: this.props.item.problem,
      flipped: this.props.item.flipped,
      truth: this.props.item.truth
    })
  }

  showFlipped() {
    return !!this.state.problem || !!this.state.flipped || !!this.state.truth
  }

  showTruth() {
    return !!this.state.flipped || !!this.state.truth
  }

  render() {
    return (
      <div className='item'>
        <textarea
          value={this.state.problem}
          onChange={e => this.handleChange({ problem: e.target.value })}
          placeholder="What's bothering you?"
          autoFocus={this.props.canAutoFocus}
        />
        {this.showFlipped() && <textarea
          value={this.state.flipped}
          onChange={e => this.handleChange({ flipped: e.target.value })}
          placeholder='Flip it around'
        />}
        {this.showTruth() && <textarea
          value={this.state.truth}
          onChange={e => this.handleChange({ truth: e.target.value })}
          placeholder="What's the resonant truth?"
        />}
      </div>
    )
  }

}

export default class extends React.Component {

  state = {
    date: moment(),
    content: []
  }

  handleChange = (i, newItem) => {
    this.setState({
      content: [
        ...this.state.content.slice(0, i),
        newItem,
        ...this.state.content.slice(i + 1)
      ]
    }, this.checkLast)
  }

  handleNext = () => {
    this.props.history.push(`${this.props.history.location.pathname}/record`)
  }

  checkLast = () => {
    // Check if we need to add an item
    const last = _.last(this.state.content)
    if (!last || !!last.truth) {
      this.setState({
        content: [
          ...this.state.content,
          {}
        ]
      })
    }
  }

  componentDidMount() {
    if (this.props.entry) {
      this.setState(this.props.entry, this.checkLast)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entry) {
      this.setState(nextProps.entry, this.checkLast)
    }
  }

  render() {
    return (
      <div>
        <h1>{moment(this.state.date).format('MMM Do, YYYY')}</h1>
        <div className='container'>
          {this.state.content.map((item, i) => (
            <Item
              item={item}
              key={i}
              onChange={newItem => this.handleChange(i, newItem)}
              canAutoFocus={i === 0}
            />
          ))}

          <button onClick={this.handleNext} className='button'>
            Next ->
          </button>
        </div>
      </div>
    )
  }

}
