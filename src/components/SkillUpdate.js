import React, { useState, useEffect} from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { _loadSkills, _loadClients, _updateSkill } from '../../store'

const SkillUpdate =(props)=>{
  const { id } = useParams()
  const [name, setName] = useState('')
  
  const skill = useSelector((state) => state.skills.filter(skill => skill.id === id*1)[0]);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(_loadSkills())
  },[])
  const submit = (e) => {
    e.preventDefault()
    dispatch(_updateSkill(id, name))
    setName('')
    window.location.href = '/'
  }

  //console.log('skill-->', skill)
  return (
    <div>
      <Link to='/home'> 
        <h1>Acme Talent Agency</h1>
      </Link>
      <form onSubmit={submit}>
        <input 
          type='text'
          name='name' 
          placeholder={skill ? skill.name : 'Skill name' } 
          onChange={(evt)=> {
            setName(evt.target.value)
          }}
          />
        
        <button type='submit' disabled={name.length === 0}>Update</button>
        <button onClick={()=>{props.history.push('/home')}}>Cancel</button>
      </form>
    </div>
  )
}



const mapState = (state, ownProps)=>{
  return {
    history: ownProps.history
  }
}

export default connect(mapState)(SkillUpdate)