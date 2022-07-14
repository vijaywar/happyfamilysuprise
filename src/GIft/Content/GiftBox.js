import React, { Component } from 'react'

export default class GiftBox extends Component {

    submitForm = () => {
        var checkedElements = document.getElementsByName("giftPersonData");
        var giftTarget = [];
        for (var ele of checkedElements) {
            if (ele.checked) {
                giftTarget.push(ele.value)
            }
        }
        localStorage.setItem('giftTarget', JSON.stringify(giftTarget));
        window.location.reload();
    }
    componentDidMount = () => {
        var giftTarget = localStorage.getItem('giftTarget');
        if (giftTarget != null) {
            giftTarget = JSON.parse(giftTarget);
        }
        else {
            giftTarget = []
        }
        var checkedElements = document.getElementsByName("giftPersonData");
        for (var ele of checkedElements) {
            if (giftTarget.includes(ele.value)) {
                ele.checked = true
            }
        }
    }
    render() {

        return (
            <div className='GiftBox p-2'>
                <div className='mt-4'>Let's suprise our loved ones </div>
                <button className="btn btn-danger mt-5" data-toggle="modal" data-target="#findGift">Find Gift</button>

                <div class="modal fade textBlack" id="findGift" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title ">Let' get the best gifts</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body ">
                                <div className='card-header textBlack textSmall'>who are we planning to gift</div>
                                <div class="form-check">
                                    <label class="form-check-label textSmall">
                                        <input type="checkbox" name='giftPersonData' class="form-check-input" value="Brother" />
                                        Brother
                                    </label>
                                    <label class="form-check-label textSmall">
                                        <input type="checkbox" name='giftPersonData' class="form-check-input" value="Sister" />
                                        Sister
                                    </label>
                                    <label class="form-check-label textSmall">
                                        <input type="checkbox" name='giftPersonData' class="form-check-input" value="Mom" />
                                        Mom
                                    </label>
                                    <label class="form-check-label textSmall">
                                        <input type="checkbox" name='giftPersonData' class="form-check-input" value="Dad" />
                                        Dad
                                    </label>
                                    <label class="form-check-label textSmall">
                                        <input type="checkbox" name='giftPersonData' class="form-check-input" value="Friend" />
                                        Friend
                                    </label>
                                    <label class="form-check-label textSmall">
                                        <input type="checkbox" name='giftPersonData' class="form-check-input" value="girlFriend" />
                                        girl friend
                                    </label>
                                    <label class="form-check-label textSmall">
                                        <input type="checkbox" name='giftPersonData' class="form-check-input" value="boyFriend" />
                                        boy friend
                                    </label>
                                    <label class="form-check-label textSmall">
                                        <input type="checkbox" name='giftPersonData' class="form-check-input" value="Other" />
                                        Other
                                    </label>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={this.submitForm} type="button" data-dismiss="modal" class="btn btn-primary">Submit</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
