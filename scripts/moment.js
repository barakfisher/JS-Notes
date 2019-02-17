
// const ago = new Date('january 1 2020 00:00:00');
// const agoTimestemp = ago.getTime();

// const today = new Date(); 
// const todayTimestemp = today.getTime();

// if( agoTimestemp < todayTimestemp){
//     console.log(today.toString())
// } else if (agoTimestemp > today){
//     console.log(ago.toString())
// }


// const now = moment();
// console.log(now.toString());
// now.subtract(1,'week').subtract(20,'days')
// // using format method from moment js display docs
// console.log(now.format('MMMM Do, YYYY' ));
// console.log(now.fromNow())

// const nowTimestamp = now.valueOf()

const birthDay = moment()
birthDay.year(1988).month(0).date(31)
console.log(birthDay.format('MMMM Do, YYYY'))
