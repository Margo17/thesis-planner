import React from 'react';

import { css } from '@emotion/react';

const PlannerForm = () => {
	return (
		<div css={styles.formContainer}>
			<div css={styles.formInput}>
				<label htmlFor='startDate'>Thesis start date:</label>
				<input name='startDate' id='startDate' />
			</div>
			<div css={styles.formInput}>
				<label htmlFor='workHours'>Approximate work hours:</label>
				<input name='workHours' id='workHours' />
			</div>
		</div>
	);
};

const styles = {
	formContainer: css`
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 20px;
		background-color: white;
		border: 1px solid black;
		border-radius: 5px;
		box-shadow: 5px 5px 5px black;
	`,
	formInput: css`
		display: flex;
		justify-content: space-between;
		gap: 10px;
	`,
};

export default PlannerForm;
