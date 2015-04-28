import React from 'react';

export default React.createClass({

    getDefaultProps(){
        return {
            headers: [],
            data: [],
            loading: false
        }
    },

    getInitialState(){
        return {
            selectedItem: null
        };
    },

    onSort(orderBy){
        this.setProps({orderBy})

        if (this.props.onSort) {
            setTimeout(()=>this.props.onSort(orderBy));
        }
    },

    selectRow(item){
        this.setState({
            selectedItem: item
        })
    },

    render(){
        return (
            <table className="pRatings--table">
                {this.getTableHeader()}
                {this.getTableBody()}
            </table>
        );
    },

    getTableHeader(){
        var orderBy = this.props.orderBy;
        return (
            <thead>
            <tr>
                <th className='pRatings--table--header-cell pRatings--table--header-cell-right pRatings--table--header-cell-first'>
                    №
                </th>

                {
                    this.props.headers.map((header, index)=> {
                        if (header.sortable) {
                            var arrowsClass = "pRatings--table--header-cell--arrows";
                            if (orderBy === header.field) {
                                arrowsClass += ' pRatings--table--header-cell--arrows-desc'
                            }
                            return (
                                <th onClick={this.onSort.bind(this, header.field)}
                                    className={this.cellClassName(index,'pRatings--table--header-cell pRatings--table--header-cell-sortable')}>
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
        );
    },

    getTableBody(){
        if (this.props.loading){
            return this.renderLoading();
        }

        var data = this.props.data || [];

        if (!data.length){
            return this.renderEmptyTable();
        }

        return (
            <tbody>
            {
                data.map((item, index)=> {
                    var rowClassName = 'pRatings--table--row';
                    if (item === this.state.selectedItem) {
                        rowClassName = ' pRatings--table--row-selected'
                    }
                    return (
                        <tr className={rowClassName} onClick={this.selectRow.bind(this, item)}>
                            <td className="pRatings--table--cell pRatings--table--cell-right pRatings--table--cell-first">{index + 1}</td>
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
        );
    },

    renderEmptyTable(){
        return (
            <tbody>
                <tr className='pRatings--table--row pRatings--table--row-empty'>
                    <td className='pRatings--table--cell pRatings--table--cell-empty' colSpan={this.props.headers.length+1}>
                        Нет данных
                    </td>
                </tr>
            </tbody>
        );
    },

    renderLoading(){
        return (
            <tbody>
                <tr className='pRatings--table--row pRatings--table--row-loading'>
                    <td className='pRatings--table--cell pRatings--table--cell-loading' colSpan={this.props.headers.length+1}>
                        <div className='pRatings--loader'></div>
                    </td>
                </tr>
            </tbody>
        );
    },

    cellClassName(index, initClassNames){
        if (index === this.props.headers.length - 1) {
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