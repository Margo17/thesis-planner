import React, { useState } from 'react';

import { css } from '@emotion/react';
import { Controller, useForm } from 'react-hook-form';

type ThesisPlannerFormValues = {
	workHours: number | null;
	startDate: string | null;
	endDate: string | null;
};

const PlannerForm = () => {
	const [showResults, setShowResults] = useState(false);

	const currentDate = new Date().toISOString().slice(0, 10);

	const form = useForm<ThesisPlannerFormValues>({
		defaultValues: {
			workHours: null,
			startDate: null,
			endDate: null,
		},
	});

	const onSubmit = (formValues: ThesisPlannerFormValues) => {
		setShowResults(true);
	};

	return (
		<div css={styles.formContainer}>
			<form onSubmit={form.handleSubmit(onSubmit)} css={styles.formFields}>
				<div css={styles.formInput}>
					<label htmlFor='workHours'>Approximate work hours:</label>
					<input name='workHours' id='workHours' />
				</div>
				<div css={styles.formInput}>
					<label htmlFor='startDate'>Thesis work start date:</label>
					<input
						name='startDate'
						id='startDate'
						type='date'
						min={currentDate}
					/>
				</div>
				<div css={styles.formInput}>
					<label htmlFor='endDate'>Thesis work end date:</label>
					<input name='endDate' id='endDate' type='date' min={currentDate} />
				</div>
				<button css={styles.submitButton} type='submit'>
					Calculate
				</button>
			</form>

			{showResults && <div>DISPLAY DATES HERE</div>}
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
	`,
};

export default PlannerForm;
