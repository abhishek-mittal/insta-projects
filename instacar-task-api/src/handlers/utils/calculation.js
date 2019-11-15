function calculateDayGap(d1, d2) {

}

function getDay(d) {return d.toDateString().split(' ')[0]};
function getDiff(f,t) { return Math.round((t-f)/(1000*60*60*24));};

function getArrayOfDays(f,t) {
    let iDate = f;
    let iDay = getDay(f);
    let arrayOfDays= [{ day: iDay}];
    let noOfDays = getDiff(f,t);

    for(i = 0; i < noOfDays; i++){

        nextDayBuff = iDate.setDate(iDate.getDate() + 1);
        nextDay = getDay(new Date(nextDayBuff));

        arrayOfDays.push({ day: nextDay });
    }

    return arrayOfDays;
}

module.exports = {
    getDiff
}