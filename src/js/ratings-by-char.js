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
    {
        title: 'В игре', field: 'use_time_sec',
        format(item){
            return formatSeconds(item.use_time_sec);
        }
    },
    {
        title: 'Класс', field: 'class',
        format(item){
            return item.class;
        }
    }
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

function formatSeconds(seconds) {
    var sec_num = parseInt(seconds, 10); // don't forget the second param
    var days = Math.floor(sec_num / 3600 / 24);
    var hours = Math.floor((sec_num - (days * 24 * 3600)) / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600 + days * 24 * 3600)) / 60);
    var seconds = sec_num - (days * 3600 * 24) - (hours * 3600) - (minutes * 60);

    days = days < 1 ? '' : days + 'д ';
    hours = hours < 1 ? '' : hours + 'ч ';
    minutes = minutes < 1 ? '' : minutes + 'мин ';
    var time = [days, hours, minutes].join(' ');
    return time;
}

export default {

    url: 'http://cdn.inn.ru/webdav/ratings/files/l2cl_chars.ratings.characters.json',

    info(){
        var h = new Date().getHours();
        return `Top ${this.limit} персонажей. Обновлено ${h} часов назад.`;
    },

    tabs: [
        {label: 'Опыт', value: 'BySkill'},
        {label: 'PvP/PK', value: 'ByPvP'},
        {label: 'Адена', value: 'ByAdena'}
    ],

    servers: [
        {label: 'Все', value: ''},
        {label: 'Gran Kain', value: 'Gran Kain'},
        {label: 'Shilien', value: 'Shilien'},
        {label: 'Eva', value: 'Eva'},
        {label: 'Maphr', value: 'Maphr'}
    ],

    tableHeaders: {
        BySkill: commonTableHeaders.concat({
            title: 'Опыт', field: 'exp_cnt', sortable:true,
            format(item){
                return prettifyNumber(item.exp_cnt);
            }
        }),
        ByPvP: commonTableHeaders.concat({
            title: 'PvP', field: '',sortable:true,
            format(item){
                return '????';//prettifyNumber(item.exp_cnt);
            }
        }, {
            title: 'PK', field: 'pk_cnt',sortable:true,
            format(item){
                return prettifyNumber(item.pk_cnt);
            }
        }),
        ByAdena: commonTableHeaders
    },

    sortInfo:{
        BySkill:{field: 'exp_cnt'},
        ByPvP: {field: ''},
        ByAdena: {field: ''}
    },

    search(item, searchString){
        return (item.char || '').toLowerCase().indexOf((searchString || '').toLowerCase())>=0;
    },

    sort(itemA, itemB, orderBy){
        var orderFields = [orderBy, 'level', 'use_time_sec', 'char'];

        function sort(itemA, itemB, orderBy) {
            var a = itemA[orderBy];
            var b = itemB[orderBy];

            if (a < b) {
                return -1;
            }

            if (a > b) {
                return 1;
            }

            if (orderFields.length) {
                return sort(itemA, itemB, orderFields.shift());
            }

            return 0;
        }

        return sort(itemA, itemB, orderFields.shift());
    },

    limit: 100

}