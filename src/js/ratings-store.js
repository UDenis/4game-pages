import $ from 'jquery'

import ratingsByChar from './ratings-by-char.js'
import ratingsByClan from './ratings-by-clan.js'

export default {
    load(filter){
        return loadRatings(filter.ratingBy)
            .then(filterAndSortRatings.bind(null, filter));
    }
}

var ratingsUri = {
    'byPersonage': ratingsByChar.url,
    'byClan': ratingsByClan.url
}

function loadRatings(ratingsType) {
    var ratings = loadRatings[ratingsType];
    if (!ratings) {
        ratings = loadRatings[ratingsType] = $.ajax(ratingsUri[ratingsType]);
    }

    return ratings;
}

function filterAndSortRatings(filter, ratings) {

    //var servers = ratings.map((r)=>r.server).filter((value, index, self)=>{
    //    return self.indexOf(value) === index;
    //});
    //
    //console.log(servers);

    ratings = ratings.filter((item)=> {
        var filtered = true;

        if (filter.server) {
            filtered = filtered && item.server === filter.server;
        }

        filtered = filtered && filter.search(item);


        return filtered;
    });

    ratings = ratings.sort((a,b)=>filter.sort(a,b));

    if (filter.limit) {
        return ratings.slice(0, filter.limit);
    }

    return ratings;
}