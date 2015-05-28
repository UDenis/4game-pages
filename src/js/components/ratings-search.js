import React from '../lib/react';

function debouncing(fn, timeout, context){
    var t;
    return function (){
        if (t) {
            clearTimeout(t);
            t = null;
        }
        if (!t) {
            var args = arguments;
            t = setTimeout(()=> {
                t = null;
                fn.apply(context, args);
            }, timeout);
        }
    };
}

export default React.createClass({

    getDefaultProps(){
        return {
            searchString: ''
        }
    },

    componentWillUnmount(){
        this.input = null;
    },

    componentDidMount(){
        // this.input = React.findDOMNode(this.refs.input);
        this.input = this.getDOMNode(); // React v0.12
        this.onChange = debouncing(this.onChange, 200, this);
    },

    onChange(){
        this.onSearch();
    },

    onSearch(){
        this.setProps({
            searchString: this.input.value
        });

        if (this.props.onSearch) {
            setTimeout(()=>this.props.onSearch(),0);
        }
    },

    render(){
        return (
            <input ref='input' type="search" onChange={this.onChange}/>
        );
    }

})