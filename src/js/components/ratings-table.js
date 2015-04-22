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
            loaing: false,
            selectedItem: null
        };
    },

    onSort(orderBy){
        this.setProps({orderBy})

        if (this.props.onSort){
            setTimeout(()=>this.props.onSort(orderBy));
        }
    },

    selectRow(item){
        this.setState({
            selectedItem: item
        })
    },

    render(){
        var orderBy = this.props.orderBy ;
        return (
            <table className="pRatings--table">
                <thead>
                <tr>
                    <th className='pRatings--table--header-cell pRatings--table--header-cell-right'>
                        №
                    </th>

                    {
                        this.props.headers.map((header, index)=> {
                            if (header.sortable) {
                                var arrowsClass = "pRatings--table--header-cell--arrows";
                                if (orderBy === header.field ){
                                    arrowsClass += ' pRatings--table--header-cell--arrows-desc'
                                }
                                return (
                                    <th onClick={this.onSort.bind(this, header.field)} className={this.cellClassName(index,'pRatings--table--header-cell pRatings--table--header-cell-sortable')}>
                                        <div>
                                            <span>{header.title}</span>
                                        </div>
                                        <i className={arrowsClass}></i>
                                    </th>
                                );
                            } else {
                                return (
                                    <th className={this.cellClassName(index,'pRatings--table--header-cell')}>{header.title}</th>
                                );
                            }
                        })
                    }

                </tr>
                </thead>

                <tbody>
                {
                    this.props.data.map((item, index)=> {
                        var rowClassName = 'pRatings--table--row';
                        if (item === this.state.selectedItem){
                            rowClassName = ' pRatings--table--row-selected'
                        }
                        return (
                            <tr className={rowClassName} onClick={this.selectRow.bind(this, item)}>
                                <td  className="pRatings--table--cell pRatings--table--header-cell-right">{index + 1}</td>
                                {
                                    this.props.headers.map((header, index)=> {
                                        return (
                                            <td
                                                className={this.cellClassName(index,'pRatings--table--cell')}
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

    cellClassName(index, initClassNames ){
        if (index === 0 || index === this.props.headers.length - 1) {
            return initClassNames + ' pRatings--table--header-cell-right';
        } else {
            return initClassNames;
        }
    },

    headerCellClass(){
        var className = ['pRatings--table--header-cell'];

        return className.join('/');
    }
});