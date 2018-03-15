var now = new Date(); //当前日期 
var nowDayOfWeek = now.getDay(); //今天本周的第几天 
var nowDay = now.getDate(); //当前日 
var nowMonth = now.getMonth(); //当前月 
var nowYear = now.getYear(); //当前年
nowYear += (nowYear < 2000) ? 1900 : 0; // 
var weekList = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");


const getYearMonth = function () {
  let today = new Date();//获得当前日期
  let year = today.getFullYear();//获得年份
  let month = today.getMonth() + 1;//此方法获得的月份是从0---11，所以要加1才是当前月份
  let day = today.getDate();//获得当前日期
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  return year + "" + month;
}


export function timeCompare(date, prevDate) {
  let Interval = 2 * 60 * 1000;//区间
  let _date = new Date(date);
  let _prevDate = new Date(prevDate);
  let ret = _date.getTime() - _prevDate.getTime();
  if (ret >= Interval) {
    let hours = _date.getHours() > 9 ? _date.getHours() : "0"+_date.getHours() ;
    let minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
    let hourMinutes = hours + ":" + minutes;
    if (isToday(_date)){
      return hourMinutes
    }
    if (isWeek(_date)) {
      return weekList[_date.getDay()]+" "+hourMinutes;
    }
    

    return _date.getFullYear() + "年" + (_date.getMonth() + 1) + "月" + _date.getDate() + "日 " + hourMinutes;
  };
  return '';
}
//是否当天
function isToday(date){
  return (new Date().toDateString() === date.toDateString());
}

//是否当天
function isWeek(date) {
  let start = getWeekStartDate();
  let end = getWeekEndDate();
  let t = formatDate(date);
  if (t >= start && t <= end){
    return true;
  }else{
    return false;
  }
}

//格局化日期：yyyy-MM-dd 
function formatDate(date) {
  var myyear = date.getFullYear();
  var mymonth = date.getMonth() + 1;
  var myweekday = date.getDate();
  if (mymonth < 10) {
    mymonth = "0" + mymonth;
  }
  if (myweekday < 10) {
    myweekday = "0" + myweekday;
  }
  return (myyear + "-" + mymonth + "-" + myweekday);
} 

//获得本周的开端日期 
function getWeekStartDate() {
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
  return formatDate(weekStartDate);
}

//获得本周的停止日期 
function getWeekEndDate() {
  var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
  return formatDate(weekEndDate);
} 
