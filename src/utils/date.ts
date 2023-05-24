export const isWeekend = (date = new Date()) => {
	return date.getDay() === 6 || date.getDay() === 0;
};

export const formulateWorkDayList = (
	workHours: number | null,
	workHoursPerDay: number | null,
	startDate: string | null,
	endDate: string | null
) => {
	if (!workHours || !workHoursPerDay || !startDate || !endDate) return [];

	const daysOfYear = [];
	const workDays = workHours / workHoursPerDay;
	const startDateObj = new Date(startDate);
	const endDateObj = new Date(endDate);

	for (
		let day = startDateObj, iterator = 0;
		day <= endDateObj;
		day.setDate(day.getDate() + 1)
	) {
		if (!isWeekend(day)) {
			daysOfYear.push(new Date(day).toISOString().slice(0, 10));
			iterator++;
		}

		if (iterator >= workDays) break;
	}

	if (daysOfYear.length < workDays) {
		daysOfYear.length = 0;
		daysOfYear.push(
			'Not enough time to finish the thesis with current work load'
		);
	}

	return daysOfYear;
};
