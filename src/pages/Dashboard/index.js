import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client'

import api from '../../services/api'

import './index.css'

export default function Dashboard() {
	const [emprestimos, setEmprestimos] = useState([]);
	const [requests, setRequests] = useState([])

	const user_id = localStorage.getItem('user');

	const socket = useMemo(() => socketio('http://localhost:4000', {
		query: { user_id },
	}),[user_id]);

	useEffect(() => {
		socket.on('solicitacao_request', data => {
			setRequests([...requests, data])
		})

	}, [requests, socket])

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

	async function handleAccept(id) {
		await api.post(`/solicitacoes/${id}/aprove`);

		setRequests(requests.filter(request => request._id !== id));
	}

	async function handleReject(id) {
		await api.post(`/solicitacoes/${id}/reprove`);

		setRequests(requests.filter(request => request._id !== id));
	}
	
	return (
		<div className='content-dashboard'>
			<ul className='notifications'>
				{requests.map(request => (
					<li key={request._id}>
						<p className="info-emp">
							<strong>{request.user.name} </strong> está solicitando um emprestimo no valor: <strong> R${request.price}.00 </strong>
							em <strong> {request.emprestimo.types} vezes</strong>
						</p>
						<button className="aprov" onClick={() => handleAccept(request._id)}>APROVAR</button>
						<button className="reprov" nClick={() => handleReject(request._id)}>NEGAR</button>
					</li>
				))}
				
			</ul>
			<ul className='emprestimo-list'>
				{emprestimos.map((emprestimo) => (
					<li key={emprestimo._id}>
						<header
							style={{ backgroundImage: `url(${emprestimo.thumbnail_url})` }}
						/>
						<strong>{emprestimo.name}</strong>
						<label htmlFor='types'>
							Parcelas: <span>{emprestimo.types} Vezes</span>
						</label>
						<label htmlFor='rateInterest'>
							Taxa de Juros: <span>{emprestimo.rateInterest}%</span>
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
