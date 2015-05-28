import React from '../lib/react';
import SelectorMixin from './selector-mixin'

export default React.createClass({

    mixins: [SelectorMixin],

    render(){
        var title = (this.props.selected || {}).label;

        return (

            <span className={this.getChoiceClassName()}>
                <span className="pRatings--controls--selector--caption" onClick={this.onToggle}>
                    <span>{title}</span>
                    <span className="pRatings--controls--selector--arrow"></span>
                </span>
                <span className="pRatings--controls--selector--popup">
                    {
                        this.props.items.map((item)=> {
                            return (
                                <span className={this.getChoiceItemClassName(item)}
                                    onClick={this.onSelect.bind(this, item)}>
                                    {item.label}
                                </span>
                            );
                        })
                    }
                </span>
            </span>
        );
    },

    getChoiceClassName(){
        var classNames = ['pRatings--controls--selector--input'];
        if (this.state.opened) {
            classNames.push('pRatings--controls--selector--input-opened')
        }
        return classNames.join(' ');
    },

    getChoiceItemClassName(item){
        var classNames = ['pRatings--controls--selector--item'];
        if (this.props.selected && item.value === this.props.selected.value) {
            classNames.push('pRatings--controls--selector--item-selected')
        }
        return classNames.join(' ');
    }
});