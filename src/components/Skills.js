import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { _loadClients, _loadSkills } from '../../store'
import { Link } from 'react-router-dom'

const Skills = (props) =>{
  return (
    <div>
      <h1>Skills</h1>
      <ul>
        {
          props.skills.map(skill =>(
            <Link key={skill.id} to={`/skills/${skill.id}`}>
              <li >
                {skill.name}
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
    skills: state.skills
  }
}
const mapDispatch =(dispatch)=>{
  return {
    loadClients: ()=>{ dispatch(_loadClients()) }
  }
}

export default connect(mapState, mapDispatch)(Skills)