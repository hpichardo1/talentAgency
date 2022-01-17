import { createStore } from 'redux'
import logger from 'redux-logger'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

//Action types
const LOAD_CLIENTS = 'LOAD_CLIENTS' 


const LOAD_SKILLS = 'LOAD_SKILLS'
const UPDATE_SKILL = 'UPDATE_SKILL'
const DELETE_SKILL = 'DELETE_SKILL'

//Action Creators
const load_clients = (clients)=>{
  return {
    type: LOAD_CLIENTS,
    clients
  }
}
const load_skills = (skills)=>{
  return {
    type: LOAD_SKILLS,
    skills
  }
}

const update_skill = (id, name)=>{
  return {
    type: UPDATE_SKILL,
    id,
    skill
  }
}
const deleteSkill = (clientId, skillId) =>{
  return {
    type: DELETE_SKILL,
    clientId,
    skillId
  }
}


//THUNKS
export const _loadClients = ()=>{
  return async (dispatch)=>{
    const clients = (await axios.get('/api/clients')).data
    dispatch(load_clients(clients))
  }
}
export const _loadSkills = ()=>{
  return async (dispatch)=>{
    const skills = (await axios.get('/api/skills')).data
    dispatch(load_skills(skills))
  }
}

export const _updateSkill = (id, name)=>{
  return async (dispatch)=>{
    console.log('name', typeof name)
    const updatedSkill = (await axios.put(`/api/skillupdate/${id}`, {name} )).data
    dispatch(update_skill(id, updatedSkill))
  }
}
export const _deleteSkill =(clientId,skillId)=>{
  return async (dispatch) => {
    await axios.delete(`/api/skilldelete/${clientId}/${skillId}`)
    dispatch(deleteSkill(clientId, skillId))
  }
}

//InitialState
const initialState = {
  clients: [],
  skills: [],
}

//create Store
const reducer = (state = initialState, action)=>{
  switch(action.type){
    case LOAD_CLIENTS: 
      return {
        ...state, clients: action.clients
      }
    case LOAD_SKILLS:
      return {
        ...state, skills: action.skills
      }
    case UPDATE_SKILL:
      const update = state.skills.map(skill =>{
        if(skill.id === action.id){
          return action.skill
        }
        return skill
      })
      return {
        ...state, skills: update
      }
      case DELETE_SKILL: 
      const filtered = state.clients.map((client)=>{
        if (client.id === action.clientId){
   
          client.talents = client.talents.filter(skill => skill.skill.id !== action.skillId)
          return client
        }
        return client
      })
      return {...state, clients: filtered}
    default:
      return state
  }
}

//Export Store
const store = createStore(reducer, applyMiddleware(thunk, logger))
export default store