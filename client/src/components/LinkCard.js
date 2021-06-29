import React from 'react'

export const LinkCard = ({link}) => {
	return (
		<>
			<h2>Link</h2>
			<p>Your shorted link: 
				<a href={link.to} target="_blank" rel="noreferrer noreferrer">{link.to}</a>
			</p>
			
			<p>From:
				<a href={link.from} target="_blank" rel="noreferrer noreferrer">{link.from}</a>
			</p>
			
			<p>Link clicked counter:
				<strong>{link.clicks}</strong>
			</p>
			
			<p>Created date:
				<strong>{new Date(link.date).toLocaleDateString()}</strong>
			</p>
		</>
	)
}

export default LinkCard;