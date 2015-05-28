import React from '../lib/react';

export default {
    componentWillUnmount(){
        window.removeEventListener('click', this.hide);
    },

    componentDidMount(){
        this.hide = this.hide.bind(this);
        window.addEventListener('click', this.hide);
    },

    getDefaultProps(){
        return {
            items: [],
            selected: null
        }
    },

    getInitialState(){
        return {
            opened: false
        };
    },

    onSelect(item){
        this.setProps({
            selected: item,
        });

        this.setState({
            opened: false
        });

        if (this.props.onSelect) {
            setTimeout(()=>this.props.onSelect(item), 0);
        }
    },

    onToggle(ev){
        ev.nativeEvent.marker = this;
        this.setState({
            opened: !this.state.opened
        });
    },

    hide(ev){
        if (ev.marker != this) {
            this.setState({
                opened: false
            });
        }
    }
}