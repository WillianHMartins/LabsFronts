import React, { useState } from 'react';
import api from '../../services/api';

import logo from '../../assets/images/logo.png';

export default function Login({ history }) {

    const [username, setUsername] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const response = await api.post('/clients', {
			username,
		});

		const { _id } = response.data;

        localStorage.setItem('user', _id);
        
        history.push('/dashboard');
    }
    
    return (
		<React.Fragment>
			
            <img src={logo} alt='X-lab' />

			<div className='content'>
				<p>
					<strong>Empréstimos</strong> para os <strong>Programadores</strong>
					através do seu usuário no <strong>GitHub</strong>
				</p>

				<form onSubmit={handleSubmit}>
					<label htmlFor='username'>Usuário GitHub *</label>
					<input
						id='username'
						type='username'
						placeholder='Usuário do GitHub'
		    			value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>
					<button className='btn' type='submit'>
						Entrar
					</button>
				</form>
			</div>
		</React.Fragment>
	);
}