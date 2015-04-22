import ServerSelector from './components/server-selector.js'
import RatingSelector from './components/ratings-selector.js'
import RatingTable from './components/ratings-table.js'
import RatingTabs from './components/ratings-tabs.js'
import RatingsSearch from './components/ratings-search.js'

import ratingsStore from './ratings-store.js'

import ratingsByChar from './ratings-by-char.js'
import ratingsByClan from './ratings-by-clan.js'

var ratingsBy = [
    {label: 'Персонажей', value: 'byPersonage'},
    {label: 'Кланов', value: 'byClan'}
];

var ratingsFitlterInfo = {
    byPersonage: ratingsByChar,
    byClan: ratingsByClan

}

var ratingsSelector = React.render(<RatingSelector items={ratingsBy} selected={ratingsBy[0]}
                                                   onSelect={onRatingSelected}/>, document.getElementById('jsRatingSelector'));

var serverSelector = React.render(<ServerSelector
    onSelect={onServerSelected}/>, document.getElementById('jsServerSelector'));

var ratingsTabs = React.render(<RatingTabs
    onSelect={onRatingTypeSelected}/>, document.getElementById('jsTabsSelector'));

var ratingsSearch = React.render(<RatingsSearch onSearch={onSearch}/>, document.getElementById('jsSearchSelector'));

var table = React.render(<RatingTable onSort={onSortTable}/>, document.getElementById('jsTableSelector'));

var infoElement = document.getElementById('jsInfo');

onRatingSelected(ratingsSelector.props.selected);

var ratingsInfo;
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

    table.setProps({
        headers: ratingsInfo.tableHeaders[ratingsTabs.props.selected.value],
        orderBy:ratingsInfo.sortInfo[ratingsTabs.props.selected.value].field,
        data: []
    });

    updateRatings();
    updateInfo();
}

function onServerSelected() {
    updateRatings();
}

function onSortTable(field){
    updateRatings();
}

function onRatingTypeSelected(tab) {
    table.setProps({
        headers: ratingsInfo.tableHeaders[tab.value],
        orderBy:ratingsInfo.sortInfo[tab.value].field,
        data: []
    });
    updateRatings();
}

function onSearch() {
    updateRatings();
}

function updateRatings() {
    var filter = getFilter();
    table.setProps({
        loading: true,
        data: []
    });
    ratingsStore.load(filter)
        .then(updateTable.bind(null, filter));

}

function updateTable(filter, data) {
    table.setProps({
        data: data,
        loading: false
    });
}

function getFilter() {
    return {
        ratingBy: ratingsSelector.props.selected.value,
        search(item){
            return ratingsSearch.props.searchString ? ratingsInfo.search(item, ratingsSearch.props.searchString) : true;
        },
        sort(a, b){
            return ratingsInfo.sort(a, b, table.props.orderBy);
        },
        server: serverSelector.props.selected.value,
        tab: ratingsTabs.props.selected.value,
        limit: ratingsInfo.limit
    }
}

function updateInfo(){
    infoElement.innerHTML=`${ratingsInfo.info()}`;
}


