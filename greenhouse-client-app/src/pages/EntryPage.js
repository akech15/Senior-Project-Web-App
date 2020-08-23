import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom'

const EntryPage = () => {
	const history = useHistory();

	useEffect(() => {
		const user = localStorage.getItem('user');

		if (user) {
			history.push('/home-page');
		} else {
			history.push('/login')
		}
	})


	return ("")

}

export default EntryPage