import React, { Component } from 'react'
import { compose } from 'redux'
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import './EditCard.css'
class EditContent extends Component {
    state = {
        link: 'https://amzn.to/3R2PAOX',
        frameWork: '<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" class="giftPost" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=vijaywarsta08-21&language=en_IN&marketplace=amazon&region=IN&placement=B099WNYHY2&asins=B099WNYHY2&linkId=52b42229118f154e5f0d62d3a60f5edf&show_border=true&link_opens_in_new_window=true"></iframe>',
        image: '<a href="https://www.amazon.in/Fastrack-Analog-Black-Unisex-Adult-Watch-38024PP25/dp/B099WNYHY2?crid=10DRE9Y67EY75&keywords=watch&qid=1656778105&sprefix=watc%2Caps%2C357&sr=8-10&linkCode=li2&tag=vijaywarsta08-21&linkId=1d0510ec785260e8b264cf2cb0bafdb8&language=en_IN&ref_=as_li_ss_il" target="_blank">  <img border="0" src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B099WNYHY2&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=vijaywarsta08-21&language=en_IN" />   </a>   <img src="https://ir-in.amazon-adsystem.com/e/ir?t=vijaywarsta08-21&language=en_IN&l=li2&o=31&a=B099WNYHY2" width="1" height="1" border="0" alt="" />'
        , priority: 10, points: 20, views: 2,
        message: 'demo product', tags: '',
        other: '', mainDate: new Date(), createdDate: new Date(), modifiedDate: new Date()
    }
    ChangeHandle = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    Submit = () => {
        const { firestore } = this.props;
        if (this.props.aka[0]) {
            var news;
            var update = this.state.frameWork;
            update = update.replace("style=\"width:120px;height:240px;\"", " class=\"giftPost\" ");
            this.setState({ frameWork: update });
            if (this.props.aka[0].product) {

                news = {
                    'product': [{
                        ...this.state
                    }, ...this.props.aka[0].product]
                }

                firestore.update({ collection: 'gifts', doc: 'content' }, news).then(() =>
                    alert('Updated')

                )
            }
            else {
                news = {
                    'product': [{
                        ...this.state
                    }]
                }

                firestore.update({ collection: 'gifts', doc: 'content' }, news).then(() =>
                    alert('Updated')

                )
            }

        }

    }
    updel = () => {
        const { firestore } = this.props;
        const news = this.props.aka[0].diary.filter(i => i.date !== this.state.date);
        var newsupd = {
            'diary': [...news]
        }
        firestore.update({ collection: 'gift', doc: 'content' }, newsupd).then(() => alert('Updated'))
    }
    render() {

        return (
            <div className=' m-2 row giftCarddd justify-content-center'>
                <div className="bg-white m-5  col-md-6 ">

                    <div className="body-header py-2 "><h3>Add New</h3> </div>
                    <div class="form-group">
                        <label for="">Link</label>
                        <input onChange={this.ChangeHandle} type="text" class="form-control" name="link" value={this.state.link} aria-describedby="helpId" placeholder="Enter link" />

                    </div>
                    <div class="form-group">
                        <label for="">Image</label>
                        <input onChange={this.ChangeHandle} type="text" class="form-control" name="image" value={this.state.image} aria-describedby="helpId" placeholder="Enter Image" />

                    </div>

                    <div class="form-group">
                        <label for="">Frame</label>
                        <textarea onChange={this.ChangeHandle} class="form-control" name="frameWork" value={this.state.frameWork} rows="3"></textarea>
                    </div>
                    <div class="form-group col-5 inline" >
                        <label for="">Priority</label>
                        <input onChange={this.ChangeHandle} type="text" class="form-control" name="priority" value={this.state.priority} aria-describedby="helpId" placeholder="priority" />
                    </div>
                    <div class="form-group col-5 inline ms-3">
                        <label for="">Points</label>
                        <input onChange={this.ChangeHandle} type="text" class="form-control" name="points" value={this.state.points} aria-describedby="helpId" placeholder="points" />
                    </div>
                    <div class="form-group">
                        <label for="">Message</label>
                        <input onChange={this.ChangeHandle} type="text" class="form-control" name="message" value={this.state.message} aria-describedby="helpId" placeholder="message" />
                    </div>
                    <div class="form-group">
                        <label for="">Tags</label>
                        <input onChange={this.ChangeHandle} type="text" class="form-control" name="tags" value={this.state.tags} aria-describedby="helpId" placeholder="gift,men,women,kids" />
                    </div>
                    <div class="form-group">
                        <label for=""></label>
                        <input onChange={this.ChangeHandle} type="date"
                            class="form-control" name="mainDate" value={this.state.mainDate} aria-describedby="helpId" placeholder="" />
                    </div>
                    <div className="body-fotter py-3">
                        <button onClick={this.Submit} class="btn btn-primary">Submit</button>
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
)(EditContent)


/*
 style="width:120px;height:240px;" 

 */