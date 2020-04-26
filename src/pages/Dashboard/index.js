import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DateFormat from '../../components/tools/DateFormat';

import api from '../../services/api'

import './index.css'

export default function Dashboard() {
	const [emprestimos, setEmprestimos] = useState([]);

	useEffect(() => {
		async function loadEmprestimos() {

			const user_id = localStorage.getItem('user');
			const response = await api.get('/dashboard', {
				headers: { user_id }
			})

			setEmprestimos(response.data)
		}
		
		loadEmprestimos()
	}, []);
	
	return (
		<div className='content-dashboard'>
			<ul className='emprestimo-list'>
				{emprestimos.map((emprestimo) => (
					
					<li key={emprestimo._id}>
						<header
							style={{ backgroundImage: `url(${emprestimo.thumbnail_url})` }}
						/>
						<strong>{emprestimo.name}</strong>
						<label htmlFor='debtReason'>
							Motivo: <span>{emprestimo.debtReason}</span>
						</label>
						<label htmlFor='price'>
							Valor Proposta: <span> R$ {emprestimo.price}</span>
						</label>
						<label htmlFor='types'>
							Parcelas: <span>{emprestimo.types} Vezes</span>
						</label>
						<label htmlFor='rateInterest'>
							Taxa de Juros: <span>{emprestimo.rateInterest}%</span>
						</label>
						<label htmlFor='debtDate'>
							Data:
							<DateFormat
								date={emprestimo.debtDate}
								timezone={'America/Sao_Paulo'}
							/>
						</label>
					</li>
				))}
			</ul>
			<Link to='/new'>
				<button className='btn'>Cadastrar novo empréstimo</button>
			</Link>
		</div>
	);
}
