var commonTableHeaders = [
    {
        title: 'Сервер', field: 'server',
        format(item){
            return item.server;
        }
    },
    {
        title: 'Клан', field: 'clan',
        format(item) {
            return `<div class="l2c--clan-img" style="background-image: url('data:image/png;base64,${item.clan_bitmap}');"></div>${item.clan}`;
        }
    },
    {
        title: 'Уровень, имя',
        field: 'char',
        format(item){
            return `${item.level}, <b>${item.char}</b>`;
        }
    },

];


// Разбивает укачанное число на разряды
function prettifyNumber(value) {
    value = (value + "").trim();
    if (!value.length) {
        return "—";
    }

    var [dec, frac] = value.split(".");

    if (Math.abs(+dec) < 10000) {
        return value;
    }

    var neg = dec.charAt(0) === "-";

    if (neg) {
        dec = dec.substr(1);
    }

    dec = dec.slice(0, dec.length % 3) + dec.slice(dec.length % 3).replace(/(\d{3})/g, " $&");
    if (neg) {
        dec = "&minus;" + dec
    }

    return dec + (frac ? ".#{frac}" : "");
}

function formatSeconds(seconds){
    var sec_num = parseInt(seconds, 10); // don't forget the second param
    var days   = Math.floor(sec_num / 3600/24);
    var hours   = Math.floor((sec_num - (days * 24*3600)) / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600 + days * 24*3600)) / 60);
    var seconds = sec_num - (days*3600 * 24) - (hours * 3600) - (minutes * 60);

    days = days < 1 ? '' : days +'д ';
    hours = hours < 1 ? '' : hours +'ч ';
    minutes = minutes < 1 ? '' : minutes +'мин ';
    var time = [days, hours, minutes].join(' ');
    return time;
}

export default {

    url:'http://cdn.inn.ru/webdav/ratings/files/l2cl_clans.ratings.clans.json',

    info: 'Top 100 кланов',

    tabs:[
        {label:'Репутация', value:'ByReputation'},
        {label:'Сумма уровней', value:'ByAmountOfLevels'},
        {label:'Адена', value:'ByAdena'},
    ],

    servers: [
        {label: 'Все', value: ''},
        {label: 'Gran Kain', value: 'Gran Kain'},
        {label: 'Shilien', value: 'Shillien'},
        {label: 'Eva', value: 'Eva'},
        {label: 'Maphr', value: 'Maphr'}
    ],

    tableHeaders:{
        ByReputation: commonTableHeaders,
        ByAmountOfLevels: commonTableHeaders,
        ByAdena: commonTableHeaders
    },

    search(item, searchString){
        return true
    },

    sort(a, b, orderBy){
        return 0;
    },

    limit: 1000

}