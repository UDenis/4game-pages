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
        {label: 'Shillien', value: 'Shillien'},
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
            title: 'PvP', field: 'duel_cnt',sortable:true,
            format(item){
                return prettifyNumber(item.duel_cnt);
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
        ByPvP: {field: 'duel_cnt'},
        ByAdena: {field: ''}
    },

    search(item, searchString){
        return (item.char || '').toLowerCase().indexOf((searchString || '').toLowerCase())>=0;
    },

    sort(itemA, itemB, orderBy){
        var orderFields = [orderBy, true, 'level', true, 'use_time_sec', true, 'char', false];

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

    limit: 1000

}