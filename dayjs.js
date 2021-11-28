const dayjs = require('dayjs');
require('dayjs/locale/es');

dayjs.extend(require('dayjs/plugin/utc'));
dayjs.extend(require('dayjs/plugin/duration'));
dayjs.extend(require('dayjs/plugin/relativeTime'));

console.log(dayjs(new Date('2021-10-31')).utc().add(10, 'days').format());

console.log(dayjs(new Date('2021-10-01')).fromNow());
console.log(dayjs(new Date('2021-10-01')).toNow());

console.log(dayjs(new Date('2021-10-07')).startOf('month').format());
console.log(dayjs(new Date('2021-10-07')).endOf('month').format());
