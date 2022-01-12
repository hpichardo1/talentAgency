import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { _loadClients, _loadSkills } from '../../store'
import { Link } from 'react-router-dom'

const Clients = (props) =>{

  return (
    <div>
      <h1>Clients</h1>
      <ul>
        {
          props.clients.map( client=>(
            <Link key={client.id} to={`/clients/${client.id}`}>
              <li>
                {client.name} ({client.talents.length})
              </li>
            </Link>
          ))
        }
      </ul>
    </div>

  )
}
const mapState = (state)=>{
  return {
    clients: state.clients
  }
}
const mapDispatch =(dispatch)=>{
  return {
    loadClients: ()=>{ dispatch(_loadClients()) }
  }
}

export default connect(mapState, mapDispatch)(Clients)