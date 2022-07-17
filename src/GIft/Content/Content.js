import React, { Component } from 'react'
import { compose } from 'redux'
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
class Content extends Component {

    render() {
        let content = {
            link: 'https://amzn.to/3R2PAOX',
            frameWork: '<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" class="giftPost" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=vijaywarsta08-21&language=en_IN&marketplace=amazon&region=IN&placement=B099WNYHY2&asins=B099WNYHY2&linkId=52b42229118f154e5f0d62d3a60f5edf&show_border=true&link_opens_in_new_window=true"></iframe>',
            image: '<a href="https://www.amazon.in/Fastrack-Analog-Black-Unisex-Adult-Watch-38024PP25/dp/B099WNYHY2?crid=10DRE9Y67EY75&keywords=watch&qid=1656778105&sprefix=watc%2Caps%2C357&sr=8-10&linkCode=li2&tag=vijaywarsta08-21&linkId=1d0510ec785260e8b264cf2cb0bafdb8&language=en_IN&ref_=as_li_ss_il" target="_blank">  <img border="0" src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B099WNYHY2&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=vijaywarsta08-21&language=en_IN" />   </a>   <img src="https://ir-in.amazon-adsystem.com/e/ir?t=vijaywarsta08-21&language=en_IN&l=li2&o=31&a=B099WNYHY2" width="1" height="1" border="0" alt="" />'
            , priority: 10,
            message: 'demo product',
            other: '', mainDate: new Date(), createdDate: new Date(), modifiedDate: new Date()
        }
        var tags = localStorage.getItem('giftTarget');
        tags = JSON.parse(tags);
        let ContainsTag = (itemTags) => {
            if (tags == null) {
                return true;
            }
            for (var tag of itemTags.split(",")) {
                if (tags != null && tags.includes(tag.trim())) {
                    return true;
                }
            }
            return false;
        }
        let AddData = () => {

            let frame = document.getElementById("postData");
            let frameCores = document.getElementById("couroselProd");

            if (frame != null && this.props.aka && this.props.aka[0]) {
                frame.innerHTML = '';
                frameCores.innerHTML = "";
                if (this.props.aka[0].product) {
                    var productCount = 0;
                    for (let prod of this.props.aka[0].product) {
                        //    console.log(prod)
                        if (ContainsTag(prod.tags)) {
                            let newSpan = document.createElement('span');

                            newSpan.innerHTML = prod.frameWork;
                            frame.appendChild(newSpan);
                            productCount += 1;
                        }
                        if (productCount > 6) break;
                    }
                    productCount = 0;
                    var count = 0;
                    for (let prodd of this.props.aka[0].product) {
                        // console.log(prod)
                        if (ContainsTag(prodd.tags)) {
                            let newSpan = document.createElement('div');
                            if (count === 0)
                                newSpan.setAttribute("class", "carousel-item active centerSlide")
                            else
                                newSpan.setAttribute("class", "carousel-item centerSlide")
                            count++

                            let imgEle = document.createElement('span');
                            imgEle.innerHTML = prodd.image;
                            newSpan.appendChild(imgEle)
                            frameCores.appendChild(newSpan);
                        }
                        if (productCount > 6) break;
                    }

                }

            }
            else
                setTimeout(AddData, 200)
        }
        setTimeout(AddData, 200)
        return (
            <div className='content'>
                <div>
                    <h5 className='contentSuprise'>Suprise! Let's make you life interesting</h5>
                </div>
                <div id="carouselId" className="carousel slide p-3 slideDisplay" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselId" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselId" data-slide-to="1"></li>
                        <li data-target="#carouselId" data-slide-to="2"></li>
                    </ol>
                    <div id='couroselProd' class="carousel-inner" role="listbox">

                    </div>
                    <a class="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselId" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>


                <div className='postDataSecongTwo' id='postData' >

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
)(Content)