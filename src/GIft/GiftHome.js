import React, { Component } from 'react'
import GiftBar from './NavBar/GiftBar'
import Content from './Content/Content'
import RightContent from './Content/RightContent'
import ProductDisplay from './Content/ProductDisplay'
export default class GiftHome extends Component {
    render() {
        return (
            <div className='gift'>
                <GiftBar></GiftBar>
                <div className='contentBody'>

                    <Content></Content>
                    <RightContent></RightContent>
                </div>
                <ProductDisplay />

            </div>
        )
    }
}
