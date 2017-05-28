import _ from 'lodash'
import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import db from '../db'

import './Index.css'

let idCounter = _.last(db.entries).id

export default class Index extends React.Component {

  state = {
    ...db
  }

  handleNew = () => {
    const entry = {
      id: ++idCounter,
      date: moment(),
      content: []
    }
    db.entries.push(entry)
    this.props.history.push(`/entries/${entry.id}`)
  }

  render() {
    return (
      <div>
        <div className='top'>
          <h1>Journal</h1>
          <button className='button' onClick={this.handleNew}>New Entry</button>
        </div>
        {this.state.entries.map(entry => (
          <div className='entry' key={entry.id}>
            <Link to={`/entries/${entry.id}`}>
              {moment(entry.date).format('MMM Do, YYYY')}
            </Link>
          </div>
        ))}
      </div>
    )
  }

}
