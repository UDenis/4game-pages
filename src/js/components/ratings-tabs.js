import React from 'react'
import SelectorMixin from './selector-mixin.js'

export default React.createClass({

    mixins: [SelectorMixin],

    render(){
        var selectedValue = (this.props.selected || {}).value;
        var name = Math.random();
        return (
            <div className="pRatings--controls--radiolist">
                {
                    this.props.items.map((item, index)=> {
                        var id = 'tabs-' + Math.random();
                        var classNames = index === 0 ? 'first' : index === this.props.items.length-1 ? 'last':'';
                        return (
                            <span className="pRatings--controls--radiolist-item">
                                <input id={id} type="radio" name={name} value={item.value} checked={item.value === selectedValue}/>
                                <label htmlFor={id} onClick={this.onSelect.bind(this, item)} className={classNames}>
                                    {item.label}
                                </label>
                                {this.renderTooltip(item)}
                            </span>
                        );
                    })
                }
            </div>
        );
    },

    renderTooltip(item){
        if (item.tooltip){
            return (
                <span className="pRatings--controls--radiolist-tooltip">{item.tooltip}</span>
            );
        } else {
            return null;
        }
    }

});