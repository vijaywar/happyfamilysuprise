import React, { Component } from 'react'
import { compose } from 'redux'
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'

class ProductDisplay extends Component {

    state = {
        searchMessage: '', prevMessage: 'old'
    }

    search() {

        if (this.state.searchMessage !== this.state.prevMessage) {
            let message = this.state.prevMessage
            this.setState({ prevMessage: message });
            this.AddData();
        }

    }
    onchange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    AddData = () => {

        console.log(this.state);
        let frame = document.getElementById("postDataProd");
        let frameCores = document.getElementById("couroselProd");
        frame.innerHTML = '';
        frameCores.innerHTML = "";

        if (frame != null && this.props.aka && this.props.aka[0]) {

            if (this.props.aka[0].product) {
                for (let prod of this.props.aka[0].product) {
                    if (this.state.searchMessage != null && this.state.searchMessage !== '' && prod.message.includes(this.state.searchMessage)) {
                        let newSpan = document.createElement('span');
                        newSpan.innerHTML = prod.frameWork;
                        frame.appendChild(newSpan);
                    }
                    else if (this.state.searchMessage === null || this.state.searchMessage === '') {
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
                        <button type="button" className="btn btn-secondary">Fashion</button>
                        <button type="button" className="btn btn-secondary ml-2">Food</button>
                        <button type="button" onClick={this.search.bind(this)} className="btn btn-secondary ml-2 searchBtnProductDisplay">Search</button>

                        <input type="text" name="searchMessage" id='searchTextMessage' onChange={this.onchange} class="form-control searchProductDisplay" placeholder="search" />

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