import React from 'react'

import db from '../db'
import Entry from '../components/Entry'

export default class extends React.Component {

  state = {
    entry: null
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const entry = db.entries.find(entry => `${entry.id}` === id)
    if (entry) {
      this.setState({ entry })
    } else {
      this.props.history.replace('/')
    }
  }

  render() {
    return (
      <Entry entry={this.state.entry} history={this.props.history} />
    )
  }

}
