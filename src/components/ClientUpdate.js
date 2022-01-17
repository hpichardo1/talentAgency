import React, { useState, useEffect} from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { _loadSkills, _loadClients, _updateSkill, _deleteSkill } from '../../store'


const ClientUpdate =(props)=>{
  const { id } = useParams()
  const dispatch = useDispatch();

  const client = useSelector(state => state.clients.find(client => client.id === id*1)) || {}
  const talents = client.talents || []
  const currentSkills = talents.map( currentSkill => currentSkill.skill) || []
  const desiredSkills = useSelector( state => state.skills.filter( skill => !currentSkills.find( currentSkill => currentSkill.id === skill.id) ))

  const deleteSkill = (clientId, skillId)=>{
    dispatch( _deleteSkill(clientId, skillId))
  }
  return (
    <div>
      <h1>Client Update</h1>
        {
          <h2>{client.name} Skills</h2>
        }
      <ul>
        {
          currentSkills.map( (skill) =>(
            <li key={skill.id}>{skill.name} <button onClick={()=>deleteSkill(client.id, skill.id)}>X</button></li>
          ))
        }
      </ul>
      <Link to='/'>
        <h2>back to home page</h2>
      </Link>
    </div>
  )
}

export default ClientUpdate
