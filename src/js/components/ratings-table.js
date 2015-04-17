import React from 'react';

export default React.createClass({

    getDefaultProps(){
        return {
            headers: [],
            data: []
        }
    },

    getInitialState(){
        return {
            loaing: false
        };
    },

    render(){
        return (
            <table className="pRatings--table">
                <thead>
                <tr>
                    <th className='pRatings--table--header-cell'>
                        №
                    </th>

                    {
                        this.props.headers.map((header)=> {
                            if (header.sortable) {
                                return (
                                    <th className="pRatings--table--header-cell">
                                        <div>
                                            <span>{header.title}</span>
                                        </div>
                                        <i className="pRatings--table--header-cell--arrows"></i>
                                    </th>
                                );
                            } else {
                                return (
                                    <th className="pRatings--table--header-cell">{header.title}</th>
                                );
                            }
                        })
                    }

                </tr>
                </thead>

                <tbody>
                {
                    this.props.data.map((item, index)=> {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                {
                                    this.props.headers.map((header)=> {
                                        return (
                                            <td
                                                className="pRatings--table--cell"
                                                dangerouslySetInnerHTML={{__html : header.format(item)}}></td>
                                        );
                                    })
                                }
                            </tr>
                        );
                    })
                }

                </tbody>
            </table>
        );
    },

    headerCellClass(){
        var className = ['pRatings--table--header-cell'];

        return className.join('/');
    }
});