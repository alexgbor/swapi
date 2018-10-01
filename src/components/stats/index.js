'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

class Stats extends Component {
    render() {
        return (
        <div className='player-stats'>
            <h3 className='time'>{this.props[this.props.player].stats.time} h</h3>
            <h3 className='trips'>{this.props[this.props.player].stats.trips} trips</h3>
            <h4 className='speed'>{this.props[this.props.player].vehicle.speed} km/h</h4>
            <h4 className='cargo'>{this.props[this.props.player].vehicle.cargo} kg</h4>
        </div>
    )}
}

const mapStateToProps = state => ({ player1: state.player1, player2: state.player2, game: state.game })

export default connect(mapStateToProps)(Stats)