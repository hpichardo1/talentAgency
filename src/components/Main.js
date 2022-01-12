import React, {useEffect} from 'react'
import { _loadSkills, _loadClients } from '../../store'
import { connect } from 'react-redux'
import Clients from './Clients'
import Skills from './Skills'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import Home from './Home'
import ClientUpdate from './ClientUpdate'
import SkillUpdate from './SkillUpdate'

const Main = (props) =>{
  useEffect(()=>{
    const load = async()=>{
      await props.loadClients()
      await props.loadSkills()
    }
    load()
  },[])

  return (
    <BrowserRouter>
      <div id='main'>
        <Route path='/clients/:id' component={ClientUpdate} />
        <Route path='/skills/:id' component={SkillUpdate} />
        <Route exact path='/' component={Home} />
      </div>
    </BrowserRouter>
  )
}

const mapDispatch =(dispatch)=>{
  return {
    loadClients: ()=>{ dispatch(_loadClients())},
    loadSkills: ()=>{ dispatch(_loadSkills())}
    //loadTalent: ()=>{}
  }
}

export default connect(null, mapDispatch)(Main)