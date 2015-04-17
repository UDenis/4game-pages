import React from 'react'
import SelectorMixin from './selector-mixin.js'

export default React.createClass({

    mixins: [SelectorMixin],

    render(){
        var selectedValue = (this.props.selected || {}).value
        return (
            <div className="pRatings--controls--radiolist">
                {
                    this.props.items.map((item, index)=> {
                        var id = 'tabs-' + index;
                        var classNames = index === 0 ? 'first' : index === this.props.items.length-1 ? 'last':'';
                        return (
                            <span>
                                <input id={id} type="radio" name="ratingType" checked={item.value === selectedValue}/>
                                <label htmlFor={id} onClick={this.onSelect.bind(this, item)} className={classNames}>
                                    {item.label}
                                </label>
                            </span>
                        );
                    })
                }
            </div>
        );
    }
});