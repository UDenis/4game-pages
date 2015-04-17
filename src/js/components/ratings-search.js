import React from 'react'

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
        this.input = React.findDOMNode(this.refs.input);
    },

    onChange(){
        this.onSearch()
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