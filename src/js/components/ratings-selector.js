import React from 'react'
import SelectorMixin from './selector-mixin.js'

export default React.createClass({

    mixins: [SelectorMixin],

    render(){
        var title = (this.props.selected || {}).label;

        return (
            <span className={this.getChoiceClassName()}>
                <span className="pRatings--controls--choice--title" onClick={this.onToggle}>{title}</span>
                <i className="pRatings--controls--choice--arrow"></i>
                <div className="pRatings--controls--choice--popup">
                    {
                        this.props.items.map((item)=> {
                            return (
                                <span className={this.getChoiceItemClassName(item)}
                                      onClick={this.onSelect.bind(this, item)}>{item.label}</span>
                            );
                        })
                    }
                    <span className="pRatings--controls--choice--popup--arrow"></span>
                </div>
            </span>
        );
    },

    getChoiceClassName(){
        var classNames = ['pRatings--controls--choice'];
        if (this.state.opened) {
            classNames.push('pRatings--controls--choice-opened')
        }
        return classNames.join(' ');
    },

    getChoiceItemClassName(item){
        var classNames = ['pRatings--controls--choice--item'];
        if (this.props.selected && item.value === this.props.selected.value) {
            classNames.push('pRatings--controls--choice--item-selected')
        }
        return classNames.join(' ');
    }
});