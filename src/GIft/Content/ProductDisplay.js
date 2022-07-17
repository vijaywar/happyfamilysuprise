import React, { Component } from 'react'
import { compose } from 'redux'
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'

class ProductDisplay extends Component {

    state = {
        searchMessage: '', prevMessage: 'old', tags: null, type: -1
    }

    search() {

        if (this.state.searchMessage !== this.state.prevMessage) {
            let message = this.state.prevMessage
            this.setState({ prevMessage: message }, this.AddData());
            this.AddData();
        }

    }
    food = () => {
        if (this.state.type !== 0) {
            this.setState({ type: 0 }, this.AddData);

        }
    }
    fashion = () => {
        if (this.state.type !== 1) {
            this.setState({ type: 1 }, this.AddData);
        }
    }
    all = () => {
        if (this.state.type !== -1) {
            this.setState({ type: -1 }, this.AddData);
        }
    }

    ContainsTag = (itemTags) => {
        if (this.state.tags == null) {
            return true;
        }
        for (var tag of itemTags.split(",")) {
            if (this.state.tags != null && this.state.tags.includes(tag.trim())) {
                return true;
            }
        }
        return false;
    }
    ContainsFood = (itemTags) => {
        if (this.state.type !== -1) {
            var food = true;
            if (this.state.type !== 0) {
                food = false;
            }
            for (var tag of itemTags.split(",")) {
                if (tag.trim() === 'food') {
                    return food;
                }
            }
            return !food;
        }
        return true;
    }
    onchange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    AddData = () => {
        console.log("this is type :", this.state.type);
        var tags = localStorage.getItem('giftTarget');
        tags = JSON.parse(tags);
        this.setState({ tags: tags })
        //console.log(this.state);
        let frame = document.getElementById("postDataProd");

        frame.innerHTML = '';

        if (frame != null && this.props.aka && this.props.aka[0]) {

            if (this.props.aka[0].product) {
                for (let prod of this.props.aka[0].product) {

                    if (this.state.searchMessage != null && this.state.searchMessage !== '' && prod.message.includes(this.state.searchMessage) && this.ContainsTag(prod.tags) && this.ContainsFood(prod.tags)) {
                        let newSpan = document.createElement('span');
                        newSpan.innerHTML = prod.frameWork;
                        frame.appendChild(newSpan);
                    }
                    else if ((this.state.searchMessage === null || this.state.searchMessage === '') && this.ContainsTag(prod.tags) && this.ContainsFood(prod.tags)) {
                        let newSpan = document.createElement('span');
                        newSpan.innerHTML = prod.frameWork;
                        frame.appendChild(newSpan);
                    }
                }
            }

        }
        else
            setTimeout(this.AddData, 200)
    }
    componentDidMount() {


        setTimeout(this.AddData, 200)
    }
    render() {
        return (
            <div>
                <div className="cardProductDisplay">
                    <div className="filterbar">
                        <button type="button" onClick={this.fashion.bind(this)} className="btn btn-secondary">Fashion</button>
                        <button onClick={this.food.bind(this)} type="button" className="btn btn-secondary ml-2">Food</button>
                        <button onClick={this.all.bind(this)} type="button" className="btn btn-secondary ml-2">All</button>

                        <div className="searchCardBox">
                            <button type="button" onClick={this.search.bind(this)} className="btn btn-secondary ml-2 searchBtnProductDisplay">Search</button>

                            <input type="text" name="searchMessage" id='searchTextMessage' onChange={this.onchange} class="form-control searchProductDisplay" placeholder="search" />
                        </div>
                    </div>

                </div>
                <div className='productsProductDisplay'>
                    <div id='postDataProd' >

                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        aka: state.firestore.ordered.gifts,
        auth: state.firebase.auth,

    }
}
const mapDispatchToProps = {
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [{ collection: 'gifts', doc: 'content' }]), firebaseConnect()
)(ProductDisplay)