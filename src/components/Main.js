import React, {useEffect} from 'react'
import { _loadSkills, _loadClients } from '../../store'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import ClientUpdate from './ClientUpdate'
import SkillUpdate from './SkillUpdate'

const Main = (props) =>{
  useEffect(()=>{
    props.loadClients()
    props.loadSkills()
  },[])

  return (
    <BrowserRouter>
      <div id='main'>
        <Switch>
          <Route path='/clients/:id' component={ClientUpdate} />
          <Route path='/skills/:id' component={SkillUpdate} />
          <Route exact path='/' component={Home} />
          <Redirect to='/' />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

const mapDispatch =(dispatch)=>{
  return {
    loadClients: ()=>{ dispatch(_loadClients())},
    loadSkills: ()=>{ dispatch(_loadSkills())},
    loadTalents: ()=>{}
  }
}

export default connect(null, mapDispatch)(Main)