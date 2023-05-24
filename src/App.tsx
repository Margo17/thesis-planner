import React from 'react';

import './App.css';
import PlannerForm from './components/PlannerForm';
import { css } from '@emotion/react';

function App() {
	return (
		<>
			<h1 css={styles.title}>Thesis planner</h1>
			<PlannerForm />
		</>
	);
}

const styles = {
	title: css`
		font-size: 32px;
		color: white;
	`,
};

export default App;
