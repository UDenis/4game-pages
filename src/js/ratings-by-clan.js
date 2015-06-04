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
            var bg = getBg(item.alliance_bitmap);
            var alianceImage = `<div class="l2c--alliance-img" style="${bg}"></div>`;

            bg = getBg(item.clan_bitmap);
            var clanImage = `<div class="l2c--clan-img" style="${bg}"></div>`;

            if (item.clan) {
                return `${alianceImage}${clanImage}${item.clan}`;
            }
            return '';
        }
    },
    {
        title: 'Уровень',
        field: 'level',
        format(item){
            return `${item.level}`;
        }
    },
    {
        title: 'Альянс',
        field: 'level',
        format(item){
            if (item.alliance) {
                return `${item.alliance}`;
            }
            return '';
        }
    },
    {
        title: 'Лидер',
        field: 'clan_lead',
        format(item){
            return item.clan_lead;
        }
    },
    {
        title:'Численность',
        field: 'member_cnt',
        format(item){
            return item.member_cnt;
        }
    }

];

function getBg(image){
    return image ? `background-image: url('data:image/png;base64,${image}');` : '';
}

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

    info(){
        var h = new Date().getHours();
        return `Top ${this.limit} кланов. Обновлено ${h} часов назад.`;
    },

    tabs:[
        {label:'Репутация', value:'ByReputation', tooltip: '*количество репутации, заработанной кланом за все время'},
        {label:'Сумма уровней', value:'ByAmountOfLevels'},
        {label:'Адена', value:'ByAdena', tooltip: 'Рейтинг строится по количеству адены, находящейся в клановом хранилище'},
    ],

    servers: [
        {label: 'Все', value: ''},
        {label: 'Gran Kain', value: 'Gran Kain'},
        {label: 'Shillien', value: 'Shillien'},
        {label: 'Eva', value: 'Eva'},
        {label: 'Maphr', value: 'Maphr'}
    ],

    tableHeaders:{
        ByReputation: commonTableHeaders.concat({
            title:'Репутация',
            field: 'clan_reputation_score',
            sortable: true,
            format(item){
                return item.clan_reputation_score;
            }
        }),
        ByAmountOfLevels: commonTableHeaders.concat({
            title:'Сумма уровней всех членов клана',
            sortable:true,
            field:'sum_member_level',
            format(item){
                return item.sum_member_level;
            }
        }),
        ByAdena: commonTableHeaders
    },

    sortInfo:{
        ByReputation:{
            field: 'clan_reputation_score',
            desc:true
        },
        ByAmountOfLevels:{
            field: 'sum_member_level',
            desc:true
        },
        ByAdena: {
            field: 'rank_adena_cnt_general',
            desc:false
        }
    },

    search(item, searchString){
        return (item.clan || '').toLowerCase().indexOf((searchString || '').toLowerCase())>=0;
    },

    sort(itemA, itemB, orderBy){
        var orderFields = [orderBy.field, orderBy.desc, 'level', true, 'member_cnt', true, 'clan', false];

        function sort(itemA, itemB, orderBy, desc) {
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
                return sort(itemA, itemB, orderFields.shift(), orderFields.shift());
            }

            return 0;
        }

        return sort(itemA, itemB, orderFields.shift(), orderFields.shift());
    },

    limit: 100

}