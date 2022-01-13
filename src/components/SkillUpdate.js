import React, { useState, useEffect} from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { _loadSkills, _loadClients } from '../../store'

const SkillUpdate =(props)=>{
  const { id } = useParams()
  const [form, setForm] = useState()
  const skills = useSelector((state) => state.skills);
  const skill = useSelector((state) => state.skills.filter(skill => skill.id === id*1)[0]);
  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(_loadSkills())
  },[])

  console.log('skill-->', skill)
  return (
    <div>
      <h1>Acme Talent Agency</h1>
      <form>
        <input type='text' name='skillName' placeholder={skill ? skill.name : 'Skill name' } />
      </form>
    </div>
  )
}



// const mapState = (state, ownProps)=>{
//   console.log('ownProps',ownProps)
//   const skill = state.skills.filter(skill => skill.id === ownProps.match.params.id*1)[0]
//   //console.log('mapState Skill->', skill)
//   return {
//     skills: state.skills,
//     //skill
//   }
// }
// const mapDispatch = (dispatch)=>{
//   return {
//     loadSkills: ()=>{ dispatch(_loadSkills())},
//   }
// }

export default SkillUpdate