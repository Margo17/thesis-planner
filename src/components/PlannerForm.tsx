import React, { useState } from 'react';

import { css } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { formulateWorkDayList } from '../utils/date';

type ThesisPlannerFormValues = {
	workHours: number | null;
	workHoursPerDay: number | null;
	startDate: string | null;
	endDate: string | null;
};

let workDayList: string[] = [];

const PlannerForm = () => {
	const [showResults, setShowResults] = useState(false);

	const form = useForm<ThesisPlannerFormValues>({
		defaultValues: {
			workHours: null,
			workHoursPerDay: null,
			startDate: null,
			endDate: null,
		},
	});

	const workHoursPerDayValue = form.watch('workHoursPerDay');
	const currentDateString = new Date().toISOString().slice(0, 10);

	const onSubmit = (formValues: ThesisPlannerFormValues) => {
		const { workHours, workHoursPerDay, startDate, endDate } = formValues;

		workDayList = formulateWorkDayList(
			workHours,
			workHoursPerDay,
			startDate,
			endDate
		);
		setShowResults(true);
	};

	return (
		<div css={styles.formContainer}>
			<form onSubmit={form.handleSubmit(onSubmit)} css={styles.formFields}>
				<div css={styles.formInput}>
					<label htmlFor='workHours'>Approximate work hours:</label>
					<input
						id='workHours'
						type='number'
						min={1}
						{...form.register('workHours', { required: true })}
					/>
				</div>
				{form.formState.errors.workHours && (
					<div css={styles.error}>This field is required</div>
				)}

				<div css={styles.formInput}>
					<label htmlFor='workHoursPerDay'>Hours dedicated per day:</label>
					<input
						id='workHoursPerDay'
						type='number'
						min={1}
						max={16}
						{...form.register('workHoursPerDay', { required: true })}
					/>
				</div>
				{form.formState.errors.workHoursPerDay && (
					<div css={styles.error}>This field is required</div>
				)}

				<div css={styles.formInput}>
					<label htmlFor='startDate'>Thesis work start date:</label>
					<input
						id='startDate'
						type='date'
						min={currentDateString}
						{...form.register('startDate', { required: true })}
					/>
				</div>
				{form.formState.errors.startDate && (
					<div css={styles.error}>This field is required</div>
				)}

				<div css={styles.formInput}>
					<label htmlFor='endDate'>Thesis work end date:</label>
					<input
						id='endDate'
						type='date'
						min={currentDateString}
						{...form.register('endDate', { required: true })}
					/>
				</div>
				{form.formState.errors.endDate && (
					<div css={styles.error}>This field is required</div>
				)}

				<button css={styles.submitButton} type='submit' disabled={showResults}>
					Calculate
				</button>
			</form>

			{showResults && (
				<div>
					<h2>Work schedule:</h2>
					<ul css={styles.dateList}>
						{workDayList.map((date) => (
							<li key={date} css={styles.dateItem}>
								{date} ({workHoursPerDayValue}h)
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

const styles = {
	formContainer: css`
		padding: 20px;
		background-color: white;
		border: 1px solid black;
		border-radius: 5px;
		box-shadow: 5px 5px 5px black;
	`,
	formFields: css`
		display: flex;
		flex-direction: column;
		gap: 10px;
	`,
	formInput: css`
		display: flex;
		justify-content: space-between;
		gap: 10px;
	`,
	submitButton: css`
		width: fit-content;
		margin: 10px auto;

		:disabled {
			pointer-events: none;
		}
	`,
	error: css`
		color: red;
	`,
	dateList: css`
		padding: 0;
	`,
	dateItem: css`
		list-style-type: none;
	`,
};

export default PlannerForm;
