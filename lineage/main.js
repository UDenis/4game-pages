(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _React = require('../lib/react');

var _React2 = _interopRequireWildcard(_React);

function debouncing(fn, timeout, context) {
    var t;
    return function () {
        if (t) {
            clearTimeout(t);
            t = null;
        }
        if (!t) {
            var args = arguments;
            t = setTimeout(function () {
                t = null;
                fn.apply(context, args);
            }, timeout);
        }
    };
}

exports['default'] = _React2['default'].createClass({
    displayName: 'ratings-search',

    getDefaultProps: function getDefaultProps() {
        return {
            searchString: ''
        };
    },

    componentWillUnmount: function componentWillUnmount() {
        this.input = null;
    },

    componentDidMount: function componentDidMount() {
        // this.input = React.findDOMNode(this.refs.input);
        this.input = this.getDOMNode(); // React v0.12
        this.onChange = debouncing(this.onChange, 200, this);
    },

    onChange: function onChange() {
        this.onSearch();
    },

    onSearch: function onSearch() {
        var _this = this;

        this.setProps({
            searchString: this.input.value
        });

        if (this.props.onSearch) {
            setTimeout(function () {
                return _this.props.onSearch();
            }, 0);
        }
    },

    render: function render() {
        return _React2['default'].createElement('input', { ref: 'input', type: 'search', onChange: this.onChange });
    }

});
module.exports = exports['default'];

},{"../lib/react":8}],2:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _React = require('../lib/react');

var _React2 = _interopRequireWildcard(_React);

var _SelectorMixin = require('./selector-mixin');

var _SelectorMixin2 = _interopRequireWildcard(_SelectorMixin);

var _RatingsTabs = require('./ratings-tabs.js');

var _RatingsTabs2 = _interopRequireWildcard(_RatingsTabs);

exports['default'] = _RatingsTabs2['default'];
module.exports = exports['default'];

},{"../lib/react":8,"./ratings-tabs.js":4,"./selector-mixin":5}],3:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _React = require('../lib/react');

var _React2 = _interopRequireWildcard(_React);

exports['default'] = _React2['default'].createClass({
    displayName: 'ratings-table',

    getDefaultProps: function getDefaultProps() {
        return {
            headers: [],
            data: [],
            loading: false
        };
    },

    getInitialState: function getInitialState() {
        return {
            selectedItem: null
        };
    },

    onSort: function onSort(orderBy) {
        var _this = this;

        //this.setProps({orderBy})
        if (this.props.onSort) {
            setTimeout(function () {
                return _this.props.onSort({ field: orderBy, desc: true });
            });
        }
    },

    selectRow: function selectRow(item) {
        this.setState({
            selectedItem: item
        });
    },

    render: function render() {
        return _React2['default'].createElement(
            'table',
            { className: 'pRatings--table' },
            this.getTableHeader(),
            this.getTableBody()
        );
    },

    getTableHeader: function getTableHeader() {
        var _this2 = this;

        var orderBy = (this.props.orderBy || {}).field;
        return _React2['default'].createElement(
            'thead',
            null,
            _React2['default'].createElement(
                'tr',
                null,
                _React2['default'].createElement(
                    'th',
                    { className: 'pRatings--table--header-cell pRatings--table--header-cell-right pRatings--table--header-cell-first' },
                    '№'
                ),
                this.props.headers.map(function (header, index) {
                    if (header.sortable) {
                        var arrowsClass = 'pRatings--table--header-cell--arrows';
                        if (orderBy === header.field) {
                            arrowsClass += ' pRatings--table--header-cell--arrows-desc';
                        }
                        return _React2['default'].createElement(
                            'th',
                            { onClick: _this2.onSort.bind(_this2, header.field),
                                className: _this2.headerCellClass(index, 'pRatings--table--header-cell pRatings--table--header-cell-sortable') },
                            _React2['default'].createElement(
                                'div',
                                null,
                                _React2['default'].createElement(
                                    'span',
                                    null,
                                    header.title
                                )
                            ),
                            _React2['default'].createElement('i', { className: arrowsClass })
                        );
                    } else {
                        return _React2['default'].createElement(
                            'th',
                            { className: _this2.headerCellClass(index, 'pRatings--table--header-cell') },
                            header.title
                        );
                    }
                })
            )
        );
    },

    getTableBody: function getTableBody() {
        var _this3 = this;

        if (this.props.loading) {
            return this.renderLoading();
        }

        var data = this.props.data || [];

        if (!data.length) {
            return this.renderEmptyTable();
        }

        return _React2['default'].createElement(
            'tbody',
            null,
            data.map(function (item, index) {
                var rowClassName = 'pRatings--table--row';
                if (item === _this3.state.selectedItem) {
                    rowClassName = ' pRatings--table--row-selected';
                }
                return _React2['default'].createElement(
                    'tr',
                    { className: rowClassName, onClick: _this3.selectRow.bind(_this3, item) },
                    _React2['default'].createElement(
                        'td',
                        { className: 'pRatings--table--cell pRatings--table--cell-right pRatings--table--cell-first' },
                        index + 1
                    ),
                    _this3.props.headers.map(function (header, index) {
                        return _React2['default'].createElement('td', {
                            className: _this3.cellClassName(index, 'pRatings--table--cell'),
                            dangerouslySetInnerHTML: { __html: header.format(item) } });
                    })
                );
            })
        );
    },

    renderEmptyTable: function renderEmptyTable() {
        return _React2['default'].createElement(
            'tbody',
            null,
            _React2['default'].createElement(
                'tr',
                { className: 'pRatings--table--row pRatings--table--row-empty' },
                _React2['default'].createElement(
                    'td',
                    { className: 'pRatings--table--cell pRatings--table--cell-empty', colSpan: this.props.headers.length + 1 },
                    'Нет данных'
                )
            )
        );
    },

    renderLoading: function renderLoading() {
        return _React2['default'].createElement(
            'tbody',
            null,
            _React2['default'].createElement(
                'tr',
                { className: 'pRatings--table--row pRatings--table--row-loading' },
                _React2['default'].createElement(
                    'td',
                    { className: 'pRatings--table--cell pRatings--table--cell-loading', colSpan: this.props.headers.length + 1 },
                    _React2['default'].createElement('div', { className: 'pRatings--loader' })
                )
            )
        );
    },

    cellClassName: function cellClassName(index, initClassNames) {
        var className = [initClassNames];

        if (index === this.props.headers.length - 1) {
            className.push('pRatings--table--cell-right');
        }
        className.push('pRatings--table--cell-' + this.props.headers[index].field);

        return className.join(' ');
    },

    headerCellClass: function headerCellClass(index, initClassNames) {
        var className = [initClassNames];

        if (index === this.props.headers.length - 1) {
            className.push('pRatings--table--header-cell-right');
        }
        className.push('pRatings--table--header-cell-' + this.props.headers[index].field);

        return className.join(' ');
    }
});
module.exports = exports['default'];

},{"../lib/react":8}],4:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _React = require('../lib/react');

var _React2 = _interopRequireWildcard(_React);

var _SelectorMixin = require('./selector-mixin');

var _SelectorMixin2 = _interopRequireWildcard(_SelectorMixin);

exports['default'] = _React2['default'].createClass({
    displayName: 'ratings-tabs',

    mixins: [_SelectorMixin2['default']],

    render: function render() {
        var _this = this;

        var selectedValue = (this.props.selected || {}).value;
        var name = Math.random();
        return _React2['default'].createElement(
            'div',
            { className: 'pRatings--controls--radiolist' },
            this.props.items.map(function (item, index) {
                var id = 'tabs-' + Math.random();
                var classNames = index === 0 ? 'first' : index === _this.props.items.length - 1 ? 'last' : '';
                return _React2['default'].createElement(
                    'span',
                    { className: 'pRatings--controls--radiolist-item' },
                    _React2['default'].createElement('input', { id: id, type: 'radio', name: name, value: item.value, checked: item.value === selectedValue }),
                    _React2['default'].createElement(
                        'label',
                        { htmlFor: id, onClick: _this.onSelect.bind(_this, item), className: classNames },
                        item.label
                    ),
                    _this.renderTooltip(item)
                );
            })
        );
    },

    renderTooltip: function renderTooltip(item) {
        if (item.tooltip) {
            return _React2['default'].createElement('span', { className: 'pRatings--controls--radiolist-tooltip', dangerouslySetInnerHTML: { __html: item.tooltip } });
        } else {
            return null;
        }
    }

});
module.exports = exports['default'];

},{"../lib/react":8,"./selector-mixin":5}],5:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _React = require('../lib/react');

var _React2 = _interopRequireWildcard(_React);

exports['default'] = {
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('click', this.hide);
    },

    componentDidMount: function componentDidMount() {
        this.hide = this.hide.bind(this);
        window.addEventListener('click', this.hide);
    },

    getDefaultProps: function getDefaultProps() {
        return {
            items: [],
            selected: null
        };
    },

    getInitialState: function getInitialState() {
        return {
            opened: false
        };
    },

    onSelect: function onSelect(item) {
        var _this = this;

        this.setProps({
            selected: item });

        this.setState({
            opened: false
        });

        if (this.props.onSelect) {
            setTimeout(function () {
                return _this.props.onSelect(item);
            }, 0);
        }
    },

    onToggle: function onToggle(ev) {
        ev.nativeEvent.marker = this;
        this.setState({
            opened: !this.state.opened
        });
    },

    hide: function hide(ev) {
        if (ev.marker != this) {
            this.setState({
                opened: false
            });
        }
    }
};
module.exports = exports['default'];

},{"../lib/react":8}],6:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _React = require('../lib/react');

var _React2 = _interopRequireWildcard(_React);

var _SelectorMixin = require('./selector-mixin');

var _SelectorMixin2 = _interopRequireWildcard(_SelectorMixin);

exports['default'] = _React2['default'].createClass({
    displayName: 'server-selector',

    mixins: [_SelectorMixin2['default']],

    render: function render() {
        var _this = this;

        var title = (this.props.selected || {}).label;

        return _React2['default'].createElement(
            'span',
            { className: this.getChoiceClassName() },
            _React2['default'].createElement(
                'span',
                { className: 'pRatings--controls--selector--caption', onClick: this.onToggle },
                _React2['default'].createElement(
                    'span',
                    null,
                    title
                ),
                _React2['default'].createElement('span', { className: 'pRatings--controls--selector--arrow' })
            ),
            _React2['default'].createElement(
                'span',
                { className: 'pRatings--controls--selector--popup' },
                this.props.items.map(function (item) {
                    return _React2['default'].createElement(
                        'span',
                        { className: _this.getChoiceItemClassName(item),
                            onClick: _this.onSelect.bind(_this, item) },
                        item.label
                    );
                })
            )
        );
    },

    getChoiceClassName: function getChoiceClassName() {
        var classNames = ['pRatings--controls--selector--input'];
        if (this.state.opened) {
            classNames.push('pRatings--controls--selector--input-opened');
        }
        return classNames.join(' ');
    },

    getChoiceItemClassName: function getChoiceItemClassName(item) {
        var classNames = ['pRatings--controls--selector--item'];
        if (this.props.selected && item.value === this.props.selected.value) {
            classNames.push('pRatings--controls--selector--item-selected');
        }
        return classNames.join(' ');
    }
});
module.exports = exports['default'];

},{"../lib/react":8,"./selector-mixin":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * Заглушка для использования локального jQuery или из 4game
 */
exports['default'] = typeof jQuery !== 'undefined' ? jQuery : requirejs('packages/jquery');
module.exports = exports['default'];

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * Заглушка для использования локального React или из 4game
 */
exports['default'] = typeof React !== 'undefined' ? React : requirejs('packages/react');
module.exports = exports['default'];

},{}],9:[function(require,module,exports){
'use strict';

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

Object.defineProperty(exports, '__esModule', {
    value: true
});
var commonTableHeaders = [{
    title: 'Сервер', field: 'server',
    format: function format(item) {
        return item.server;
    }
}, {
    title: 'Клан', field: 'clan',
    format: function format(item) {
        var bg = getBg(item.alliance_bitmap);
        var alianceImage = '<div class="l2c--alliance-img" style="' + bg + '"></div>';

        bg = getBg(item.clan_bitmap);
        var clanImage = '<div class="l2c--clan-img" style="' + bg + '"></div>';

        if (item.clan) {
            return '' + alianceImage + '' + clanImage + '' + item.clan;
        }
        return '';
    }
}, {
    title: 'Уровень, имя',
    field: 'char',
    format: function format(item) {
        return '' + item.level + ', <b>' + item.char + '</b>';
    }
}, {
    title: 'В игре', field: 'use_time_sec',
    format: function format(item) {
        return formatSeconds(item.use_time_sec);
    }
}, {
    title: 'Класс', field: 'class',
    format: function format(item) {
        return item['class'];
    }
}];

function getBg(image) {
    return image ? 'background-image: url(\'data:image/png;base64,' + image + '\');' : '';
}

// Разбивает укачанное число на разряды
function prettifyNumber(value) {
    value = (value + '').trim();
    if (!value.length) {
        return '—';
    }

    var _value$split = value.split('.');

    var _value$split2 = _slicedToArray(_value$split, 2);

    var dec = _value$split2[0];
    var frac = _value$split2[1];

    if (Math.abs(+dec) < 10000) {
        return value;
    }

    var neg = dec.charAt(0) === '-';

    if (neg) {
        dec = dec.substr(1);
    }

    dec = dec.slice(0, dec.length % 3) + dec.slice(dec.length % 3).replace(/(\d{3})/g, ' $&');
    if (neg) {
        dec = '&minus;' + dec;
    }

    return dec + (frac ? '.#{frac}' : '');
}

function formatSeconds(seconds) {
    var sec_num = parseInt(seconds, 10); // don't forget the second param
    var days = Math.floor(sec_num / 3600 / 24);
    var hours = Math.floor((sec_num - days * 24 * 3600) / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600 + days * 24 * 3600)) / 60);
    var seconds = sec_num - days * 3600 * 24 - hours * 3600 - minutes * 60;

    days = days < 1 ? '' : days + 'д ';
    hours = hours < 1 ? '' : hours + 'ч ';
    minutes = minutes < 1 ? '' : minutes + 'мин ';
    var time = [days, hours, minutes].join(' ');
    return time;
}

exports['default'] = {

    url: 'https://cdn.inn.ru/webdav/ratings/files/l2cl_chars.ratings.characters.json',

    info: function info() {
        var h = new Date().getHours();
        return 'Top ' + this.limit + ' персонажей. Обновлено ' + h + ' часов назад.';
    },

    tabs: [{ label: 'Опыт', value: 'BySkill' }, { label: 'PvP/PK', value: 'ByPvP' }, { label: 'Адена', value: 'ByAdena', tooltip: 'Рейтинг строится по&nbsp;количеству адены, находящейся в&nbsp;инвентаре персонажа (без учета личного хранилища)' }],

    servers: [{ label: 'Все', value: '' }, { label: 'Gran Kain', value: 'Gran Kain' }, { label: 'Shillien', value: 'Shillien' }, { label: 'Eva', value: 'Eva' }, { label: 'Maphr', value: 'Maphr' }],

    tableHeaders: {
        BySkill: commonTableHeaders.concat({
            title: 'Опыт', field: 'exp_cnt', sortable: true,
            format: function format(item) {
                return prettifyNumber(item.exp_cnt);
            }
        }),
        ByPvP: commonTableHeaders.concat({
            title: 'PvP', field: 'duel_cnt', sortable: true,
            format: function format(item) {
                return prettifyNumber(item.duel_cnt);
            }
        }, {
            title: 'PK', field: 'pk_cnt', sortable: true,
            format: function format(item) {
                return prettifyNumber(item.pk_cnt);
            }
        }),
        ByAdena: commonTableHeaders
    },

    sortInfo: {
        BySkill: { field: 'exp_cnt', desc: true },
        ByPvP: { field: 'duel_cnt', desc: true },
        ByAdena: { field: 'rank_adena_general', desc: false }
    },

    search: function search(item, searchString) {
        return (item.char || '').toLowerCase().indexOf((searchString || '').toLowerCase()) >= 0;
    },

    sort: function sort(itemA, itemB, orderBy) {
        var orderFields = [orderBy.field, orderBy.desc, 'level', true, 'use_time_sec', true, 'char', false];

        function sort(_x, _x2, _x3, _x4) {
            var _again = true;

            _function: while (_again) {
                a = b = i = undefined;
                _again = false;
                var itemA = _x,
                    itemB = _x2,
                    orderBy = _x3,
                    desc = _x4;

                var a = itemA[orderBy];
                var b = itemB[orderBy];
                var i = desc ? 1 : -1;

                if (a < b) {
                    return i;
                }

                if (a > b) {
                    return -i;
                }

                if (orderFields.length) {
                    _x = itemA;
                    _x2 = itemB;
                    _x3 = orderFields.shift();
                    _x4 = orderFields.shift();
                    _again = true;
                    continue _function;
                }

                return 0;
            }
        }

        return sort(itemA, itemB, orderFields.shift(), orderFields.shift());
    },

    limit: 1000

};
module.exports = exports['default'];

},{}],10:[function(require,module,exports){
'use strict';

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

Object.defineProperty(exports, '__esModule', {
    value: true
});
var commonTableHeaders = [{
    title: 'Сервер', field: 'server',
    format: function format(item) {
        return item.server;
    }
}, {
    title: 'Клан', field: 'clan',
    format: function format(item) {
        var bg = getBg(item.alliance_bitmap);
        var alianceImage = '<div class="l2c--alliance-img" style="' + bg + '"></div>';

        bg = getBg(item.clan_bitmap);
        var clanImage = '<div class="l2c--clan-img" style="' + bg + '"></div>';

        if (item.clan) {
            return '' + alianceImage + '' + clanImage + '' + item.clan;
        }
        return '';
    }
}, {
    title: 'Уровень',
    field: 'level',
    format: function format(item) {
        return '' + item.level;
    }
}, {
    title: 'Альянс',
    field: 'level',
    format: function format(item) {
        if (item.alliance) {
            return '' + item.alliance;
        }
        return '';
    }
}, {
    title: 'Лидер',
    field: 'clan_lead',
    format: function format(item) {
        return item.clan_lead;
    }
}, {
    title: 'Численность',
    field: 'member_cnt',
    format: function format(item) {
        return item.member_cnt;
    }
}];

function getBg(image) {
    return image ? 'background-image: url(\'data:image/png;base64,' + image + '\');' : '';
}

// Разбивает укачанное число на разряды
function prettifyNumber(value) {
    value = (value + '').trim();
    if (!value.length) {
        return '—';
    }

    var _value$split = value.split('.');

    var _value$split2 = _slicedToArray(_value$split, 2);

    var dec = _value$split2[0];
    var frac = _value$split2[1];

    if (Math.abs(+dec) < 10000) {
        return value;
    }

    var neg = dec.charAt(0) === '-';

    if (neg) {
        dec = dec.substr(1);
    }

    dec = dec.slice(0, dec.length % 3) + dec.slice(dec.length % 3).replace(/(\d{3})/g, ' $&');
    if (neg) {
        dec = '&minus;' + dec;
    }

    return dec + (frac ? '.#{frac}' : '');
}

function formatSeconds(seconds) {
    var sec_num = parseInt(seconds, 10); // don't forget the second param
    var days = Math.floor(sec_num / 3600 / 24);
    var hours = Math.floor((sec_num - days * 24 * 3600) / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600 + days * 24 * 3600)) / 60);
    var seconds = sec_num - days * 3600 * 24 - hours * 3600 - minutes * 60;

    days = days < 1 ? '' : days + 'д ';
    hours = hours < 1 ? '' : hours + 'ч ';
    minutes = minutes < 1 ? '' : minutes + 'мин ';
    var time = [days, hours, minutes].join(' ');
    return time;
}

exports['default'] = {

    url: 'https://cdn.inn.ru/webdav/ratings/files/l2cl_clans.ratings.clans.json',

    info: function info() {
        var h = new Date().getHours();
        return 'Top ' + this.limit + ' кланов. Обновлено ' + h + ' часов назад.';
    },

    tabs: [{ label: 'Репутация', value: 'ByReputation', tooltip: 'Рейтинг строится по&nbsp;количеству репутации, заработанной кланом за&nbsp;все время' }, { label: 'Сумма уровней', value: 'ByAmountOfLevels' }, { label: 'Адена', value: 'ByAdena', tooltip: 'Рейтинг строится по&nbsp;количеству адены, находящейся в&nbsp;клановом хранилище' }],

    servers: [{ label: 'Все', value: '' }, { label: 'Gran Kain', value: 'Gran Kain' }, { label: 'Shillien', value: 'Shillien' }, { label: 'Eva', value: 'Eva' }, { label: 'Maphr', value: 'Maphr' }],

    tableHeaders: {
        ByReputation: commonTableHeaders.concat({
            title: 'Репутация',
            field: 'clan_reputation_score',
            sortable: true,
            format: function format(item) {
                return item.clan_reputation_score;
            }
        }),
        ByAmountOfLevels: commonTableHeaders.concat({
            title: 'Сумма уровней всех членов клана',
            sortable: true,
            field: 'sum_member_level',
            format: function format(item) {
                return item.sum_member_level;
            }
        }),
        ByAdena: commonTableHeaders
    },

    sortInfo: {
        ByReputation: {
            field: 'clan_reputation_score',
            desc: true
        },
        ByAmountOfLevels: {
            field: 'sum_member_level',
            desc: true
        },
        ByAdena: {
            field: 'rank_adena_cnt_general',
            desc: false
        }
    },

    search: function search(item, searchString) {
        return (item.clan || '').toLowerCase().indexOf((searchString || '').toLowerCase()) >= 0;
    },

    sort: function sort(itemA, itemB, orderBy) {
        var orderFields = [orderBy.field, orderBy.desc, 'level', true, 'member_cnt', true, 'clan', false];

        function sort(_x, _x2, _x3, _x4) {
            var _again = true;

            _function: while (_again) {
                a = b = i = undefined;
                _again = false;
                var itemA = _x,
                    itemB = _x2,
                    orderBy = _x3,
                    desc = _x4;

                var a = itemA[orderBy];
                var b = itemB[orderBy];
                var i = desc ? 1 : -1;

                if (a < b) {
                    return i;
                }

                if (a > b) {
                    return -i;
                }

                if (orderFields.length) {
                    _x = itemA;
                    _x2 = itemB;
                    _x3 = orderFields.shift();
                    _x4 = orderFields.shift();
                    _again = true;
                    continue _function;
                }

                return 0;
            }
        }

        return sort(itemA, itemB, orderFields.shift(), orderFields.shift());
    },

    limit: 100

};
module.exports = exports['default'];

},{}],11:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _$ = require('./lib/jquery');

var _$2 = _interopRequireWildcard(_$);

var _ratingsByChar = require('./ratings-by-char.js');

var _ratingsByChar2 = _interopRequireWildcard(_ratingsByChar);

var _ratingsByClan = require('./ratings-by-clan.js');

var _ratingsByClan2 = _interopRequireWildcard(_ratingsByClan);

exports['default'] = {
    load: function load(filter) {
        return loadRatings(filter.ratingBy).then(filterAndSortRatings.bind(null, filter));
    }
};

var ratingsUri = {
    byPersonage: _ratingsByChar2['default'].url,
    byClan: _ratingsByClan2['default'].url
};

function loadRatings(ratingsType) {
    var ratings = loadRatings[ratingsType];
    var defer = _$2['default'].Deferred();

    if (!ratings) {
        ratings = loadRatings[ratingsType] = _$2['default'].ajax(ratingsUri[ratingsType]);
    }

    ratings.then(resolvePromise(defer, 'resolve'), resolvePromise(defer, 'reject'));

    return defer.promise();
}

function resolvePromise(defer, method) {
    return function (data) {
        setTimeout(function () {
            defer[method](data);
        }, 5);
    };
}

function filterAndSortRatings(filter, ratings) {

    //var servers = ratings.map((r)=>r.server).filter((value, index, self)=>{
    //    return self.indexOf(value) === index;
    //});
    //
    //console.log(servers);

    ratings = ratings.filter(function (item) {
        var filtered = true;

        if (filter.server) {
            filtered = filtered && item.server === filter.server;
        }

        filtered = filtered && filter.search(item);

        return filtered;
    });

    ratings = ratings.sort(function (a, b) {
        return filter.sort(a, b);
    });

    if (filter.limit) {
        return ratings.slice(0, filter.limit);
    }

    return ratings;
}
module.exports = exports['default'];

},{"./lib/jquery":7,"./ratings-by-char.js":9,"./ratings-by-clan.js":10}],12:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _React = require('../js/lib/react');

var _React2 = _interopRequireWildcard(_React);

var _ServerSelector = require('../js/components/server-selector');

var _ServerSelector2 = _interopRequireWildcard(_ServerSelector);

var _RatingSelector = require('../js/components/ratings-selector');

var _RatingSelector2 = _interopRequireWildcard(_RatingSelector);

var _RatingTable = require('../js/components/ratings-table');

var _RatingTable2 = _interopRequireWildcard(_RatingTable);

var _RatingTabs = require('../js/components/ratings-tabs');

var _RatingTabs2 = _interopRequireWildcard(_RatingTabs);

var _RatingsSearch = require('../js/components/ratings-search');

var _RatingsSearch2 = _interopRequireWildcard(_RatingsSearch);

var _ratingsStore = require('../js/ratings-store');

var _ratingsStore2 = _interopRequireWildcard(_ratingsStore);

var _ratingsByChar = require('../js/ratings-by-char');

var _ratingsByChar2 = _interopRequireWildcard(_ratingsByChar);

var _ratingsByClan = require('../js/ratings-by-clan');

var _ratingsByClan2 = _interopRequireWildcard(_ratingsByClan);

var ratingsBy = [{ label: 'Персонажи', value: 'byPersonage' }, { label: 'Кланы', value: 'byClan' }];

var ratingsFitlterInfo = {
    byPersonage: _ratingsByChar2['default'],
    byClan: _ratingsByClan2['default']
};

var ratingsSelector = _React2['default'].render(_React2['default'].createElement(_RatingSelector2['default'], { items: ratingsBy, selected: ratingsBy[0],
    onSelect: onRatingSelected }), document.getElementById('jsRatingSelector'));

var serverSelector = _React2['default'].render(_React2['default'].createElement(_ServerSelector2['default'], {
    onSelect: onServerSelected }), document.getElementById('jsServerSelector'));

var ratingsTabs = _React2['default'].render(_React2['default'].createElement(_RatingTabs2['default'], {
    onSelect: onRatingTypeSelected }), document.getElementById('jsTabsSelector'));

var ratingsSearch = _React2['default'].render(_React2['default'].createElement(_RatingsSearch2['default'], { onSearch: onSearch }), document.getElementById('jsSearchSelector'));

var table = _React2['default'].render(_React2['default'].createElement(_RatingTable2['default'], { onSort: onSortTable }), document.getElementById('jsTableSelector'));

var infoElement = document.getElementById('jsInfo');

onRatingSelected(ratingsSelector.props.selected);

var ratingsInfo;
var orderBy;
function onRatingSelected(ratingBy) {
    ratingsInfo = ratingsFitlterInfo[ratingBy.value];
    serverSelector.setProps({
        items: ratingsInfo.servers,
        selected: ratingsInfo.servers[0]
    });

    ratingsTabs.setProps({
        items: ratingsInfo.tabs,
        selected: ratingsInfo.tabs[0]
    });
    orderBy = ratingsInfo.sortInfo[ratingsTabs.props.selected.value];
    table.setProps({
        headers: ratingsInfo.tableHeaders[ratingsTabs.props.selected.value],
        orderBy: orderBy,
        data: [],
        loading: true
    });

    updateRatings();
    updateInfo();
}

function onServerSelected() {
    updateRatings();
}

function onSortTable(field) {
    orderBy = field;
    updateRatings();
}

function onRatingTypeSelected(tab) {
    orderBy = ratingsInfo.sortInfo[tab.value];
    updateRatings();
}

function onSearch() {
    updateRatings();
}

function updateRatings() {
    var filter = getFilter();

    var t = setTimeout(function () {
        table.setProps({
            loading: true,
            data: []
        });
    }, 10);

    _ratingsStore2['default'].load(filter).then(function (data) {
        clearTimeout(t);
        return data;
    }).then(updateTable.bind(null, filter));
}

function updateTable(filter, data) {
    table.setProps({
        headers: ratingsInfo.tableHeaders[ratingsTabs.props.selected.value],
        orderBy: orderBy,
        data: data,
        loading: false
    });
}

function getFilter() {
    console.log('SORT BY', orderBy);

    return {
        ratingBy: ratingsSelector.props.selected.value,
        search: function search(item) {
            return ratingsSearch.props.searchString ? ratingsInfo.search(item, ratingsSearch.props.searchString) : true;
        },
        sort: function sort(a, b) {
            return ratingsInfo.sort(a, b, orderBy);
        },
        server: serverSelector.props.selected.value,
        tab: ratingsTabs.props.selected.value,
        limit: ratingsInfo.limit
    };
}

function updateInfo() {
    infoElement.innerHTML = '' + ratingsInfo.info();
}

},{"../js/components/ratings-search":1,"../js/components/ratings-selector":2,"../js/components/ratings-table":3,"../js/components/ratings-tabs":4,"../js/components/server-selector":6,"../js/lib/react":8,"../js/ratings-by-char":9,"../js/ratings-by-clan":10,"../js/ratings-store":11}]},{},[12])