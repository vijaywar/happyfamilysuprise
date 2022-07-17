import React, { Component } from 'react'
import { compose } from 'redux'
import { firestoreConnect, firebaseConnect, useFirestore } from 'react-redux-firebase'
import { connect } from 'react-redux'
import './EditCard.css'
class EditContent extends Component {
    state = {
        link: '',
        frameWork: '',
        image: ''
        , priority: 0, points: 0, views: 0,
        message: '0', tags: '',
        other: '', mainDate: new Date(), createdDate: new Date(), modifiedDate: new Date(),
        edit: false
    }
    ChangeHandle = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    Edit = () => {
        var news;

        const { firestore } = this.props;
        var productsCopy = [...this.props.aka[0].product]
        for (var i in productsCopy) {
            if (productsCopy[i].link === this.state.link) {
                productsCopy[i].frameWork = this.state.frameWork;
                productsCopy[i].image = this.state.image;
                productsCopy[i].priority = this.state.priority;
                productsCopy[i].other = this.state.other;
                productsCopy[i].mainDate = this.state.mainDate;
                productsCopy[i].createdDate = this.state.createdDate;
                productsCopy[i].createdOn = this.state.createdOn;
                productsCopy[i].createdDate = this.state.createdDate;
                productsCopy[i].tags = this.state.tags;
                productsCopy[i].points = this.state.points;
                productsCopy[i].views = this.state.views;
                productsCopy[i].message = this.state.message;
            }
        }
        if (this.props.aka[0].product) {

            news = {
                'product': [...productsCopy]
            }

            firestore.update({ collection: 'gifts', doc: 'content' }, news).then(() =>
                alert('Updated')

            )
        }
    }
    Clear = () => {
        this.setState({
            link: '',
            frameWork: '',
            image: ''
            , priority: 0, points: 0, views: 0,
            message: '0', tags: '',
            other: '', mainDate: new Date(), createdDate: new Date(), modifiedDate: new Date(),
            edit: false
        })
    }
    Submit = () => {
        if (this.state.edit) {
            this.Edit()
        }
        else {
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
    }
    EditProduct = (i, e) => {
        console.log(i)
        console.log(e)
        this.setState({ edit: true });
        this.setState({ link: i.link, frameWork: i.frameWork, image: i.image, message: i.message, other: i.other, tags: i.tags, mainDate: i.mainDate, createdOn: i.createdOn, createdDate: i.createdDate, modifiedDate: i.modifiedDate, priority: i.priority, points: i.points, views: i.views });
        window.scrollTo(0, 0)

    }
    FillWithFrame = () => {

    }
    Backup = () => {
        if (this.props.aka) {

            const { firestore } = this.props;

            var news = {
                'product': [...this.props.aka[0].product]
            }
            var nowDate = new Date().toLocaleString().replaceAll(" ", "");
            nowDate = nowDate.replaceAll(",", "_")
            nowDate = nowDate.replaceAll("/", "_");
            nowDate = nowDate.replaceAll(":", "_");
            firestore.set({ collection: 'backup', doc: nowDate }, news).then(() =>
                alert('BackUp COMpleted')

            )
        }
        else {
            alert('ConnectionError')
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
            <div className='smallText m-2 row giftCarddd justify-content-center'>
                <div className="bg-white m-5  col-lg-8 ">

                    <div className="body-header py-2 "><h3>{!this.state.edit ? <span>Add New</span> : <span>Edit</span>}</h3>
                        <button onClick={this.Clear} className='btn-warning'>Clear</button>
                        <button onClick={this.FillWithFrame} className='btn-primary mx-3'>Fill With Frame</button>
                        <button onClick={this.Backup} className='btn-success mx-3'>BackUp</button></div>
                    <div class="form-group">
                        <label for="">Link</label>
                        <input onChange={this.ChangeHandle} type="text" class="form-control" name="link" value={this.state.link} aria-describedby="helpId" placeholder="Enter link" />

                    </div>
                    <div class="form-group">
                        <label for="">Image</label>
                        <div className='teaxAreaView'>
                            <textarea onChange={this.ChangeHandle} class="form-control" name="image" value={this.state.image} aria-describedby="helpId" rows="7" placeholder="Enter Image" />
                            <div dangerouslySetInnerHTML={{ __html: this.state.image }}></div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="">Frame</label>
                        <div className='teaxAreaView'>
                            <textarea onChange={this.ChangeHandle} class="form-control" name="frameWork" value={this.state.frameWork} rows="7"></textarea>
                            <div dangerouslySetInnerHTML={{ __html: this.state.frameWork }}></div>
                        </div>
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
                {
                    this.props.aka ?
                        <div>
                            {this.props.aka[0].product.map(i => <div className='EditCard'>
                                <button onClick={this.EditProduct.bind(this, i)} className="btn-danger EditIcon"><i class="fas fa-edit    "></i></button>
                                <div className='card '>
                                    <div dangerouslySetInnerHTML={{ __html: i.frameWork }}>
                                    </div>
                                </div>
                            </div>)
                            }
                        </div>
                        :
                        <div>
                            no products
                        </div>

                }
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