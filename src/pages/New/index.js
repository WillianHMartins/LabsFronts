import React, { useState, useMemo } from 'react';
import api from '../../services/api'

import camera from '../../assets/images/camera.svg'
import './index.css'
import 'react-datepicker/dist/react-datepicker.css';

export default function New({ history }) {
	const [thumbnail, setThumbnail] = useState(null)
	const [name, setName] = useState('')
	const [rateInterest, setRateInterest] = useState('')
	const [types, setTypes] = useState('')

	const preview = useMemo(
		() => {
			return thumbnail ? URL.createObjectURL(thumbnail) : null
		},
		[thumbnail]
	)

	async function handleSubmit(event) {
		event.preventDefault()
		const data = new FormData();
		const user_id = localStorage.getItem('user')

		data.append('thumbnail', thumbnail)
		data.append('name', name)
		data.append('rateInterest', rateInterest)
		data.append('types', types)

		await api.post('/emprestimos', data, {
			headers: { user_id }
		})

		history.push('/dashboard')
	}

	return (
		<div className='content-new'>
			<form onSubmit={handleSubmit}>
				<label
					id='thumbnail'
					style={{ backgroundImage: `url(${preview})` }}
					className={thumbnail ? 'has-thumbnail' : ''}>
					<input
						type='file'
						onChange={(event) => setThumbnail(event.target.files[0])}
					/>
					<img src={camera} alt='Selecione sua imagem' />
				</label>

				<label htmlFor='name'>Nome do Empréstimo</label>
				<input
					id='name'
					placeholder='Nome do Empréstimo'
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				<label htmlFor='rateInterest'>Taxa de Juros</label>
				<input
					id='rateInterest'
					placeholder='Taxa de Juros'
					type='number'

					value={rateInterest}
					onChange={(event) => setRateInterest(event.target.value)}
				/>
				<label htmlFor='types'>Número de Parcelas</label>
				<input
					id='types'
					placeholder='Parcelas'
					value={types}
					onChange={(event) => setTypes(event.target.value)}
				/>
				<button type='submit' className='btn'>
					Cadastrar
				</button>
			</form>
		</div>
	);
}
