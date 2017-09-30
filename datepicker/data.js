(function() {
	var datepicker = {};

	datepicker.getMonthData = function(year,month) {
		var ret = [];//记录当前月份的日期
		if(!year || !month) {
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}

		var firstDay = new Date(year,month-1,1);
		//判断当月第一天为周几
		var firstDayWeekDay = firstDay.getDay();
		if(firstDayWeekDay === 0) firstDayWeekDay = 7;

		year = firstDay.getFullYear();
		month = firstDay.getMonth() +1;

		var lastDayOfLastMonth = new Date(year,month -1,0);
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

		var preMonthDayCount = firstDayWeekDay - 1;

		//本月最后一天
		var lastDay = new Date(year,month,0);
		var lastDate = lastDay.getDate();

		for(var i=0;i<7*6;i++) {
			var date = i - preMonthDayCount +1;
			var showDate = date;
			var thisMonth = month;
			//上一月
			if(date <= 0) {
				thisMonth = month - 1;
				showDate = lastDateOfLastMonth + date;
			}else if(date > lastDate) {
				//下一个月
				thisMonth = month + 1;
				showDate = showDate - lastDate;
			}

			if(thisMonth === 0) thisMonth = 12;
			if(thisMonth === 13) thisMonth = 1;

			ret.push({
				month:thisMonth,
				date:date,
				showDate:showDate
			});
		}
		return {
			year:year,
			month:month,
			days:ret
		};
	}
	window.datepicker = datepicker;
})();
