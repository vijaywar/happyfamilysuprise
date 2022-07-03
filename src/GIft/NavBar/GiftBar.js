import React, { Component } from 'react'
import './GiftBar.css'

import { Link } from 'react-router-dom'
export default class GiftBar extends Component {



    render() {
        let NavBarCSS = {
            width: '100%',
            backgroundColor: 'blue'
        }
        return (
            <div className='giftBar'>
                <Link to='/' className='navitem'>Home</Link>
                <Link to='/Product' className='navitem'>Products</Link>

            </div>
        )
    }
}
