import React, { Component } from 'react'
import RecentVisits from './RecentVisits';
import GiftBox from './GiftBox';
export default class RightContent extends Component {
    state = {
        hasRecentVisits: false
    }
    componentDidMount = () => {
        if (localStorage.getItem("hasRecentVisits") != null) {
            this.setState({ hasRecentVisits: true });
        }
    }
    render() {
        return (
            <div className='rightContent'>
                <div className='rightHead'>
                    <h5 className='rightRecent '>Recent visits</h5>
                </div>
                <div className='rightBody'>
                    {this.state.hasRecentVisits ? <RecentVisits /> : <GiftBox />}
                </div>
            </div>
        )
    }
}
