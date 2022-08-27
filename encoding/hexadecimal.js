// Hexadecimal values: 0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f

const number = 0x7fffffff;
const numberInBinaryString = (number >>> 0).toString(2);

console.log('Number:', number);
console.log();

const bytes = 4;
const buf = Buffer.alloc(bytes);

buf.writeInt32BE(number);

console.log('Binary:', numberInBinaryString, numberInBinaryString.length);
console.log('Hexadecimal', buf.toString('hex'), buf.toString('hex').length);
console.log('Decimal:', buf.readInt32BE(), buf.readInt32BE().toString().length);
