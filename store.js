import { createStore } from 'redux'
import logger from 'redux-logger'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

//Action types
const LOAD_CLIENTS = 'LOAD_CLIENTS' 
const LOAD_SKILLS = 'LOAD_SKILLS'

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
    default:
      return state
  }
}

//Export Store
const store = createStore(reducer, applyMiddleware(thunk, logger))
export default store