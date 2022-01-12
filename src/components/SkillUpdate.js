import React, { useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SkillUpdate =(props)=>{
  const { id } = useParams()
  const [skill, setSkill] = useState(()=>{
    return {}
  })

  useEffect(()=>{
    const loadSkill = async ()=>{
      const found = await props.getSkill(id)
      setSkill(found)
    }
    loadSkill()
  }, [])

  console.log('skill-->', skill)
  return (
    <div>
      <h1>Acme Talent Agency</h1>
      <form>
        <input type='text' name='skillName' placeholder={skill.name} />
      </form>
    </div>
  )
}

const mapState = (state)=>{
  return {
    skills: state.skills,
  }
}
const mapDispatch = (dispatch)=>{
  return {
    updateSkill: (id)=>{},
    getSkill: async (id)=>{ 
      const skill = (await axios.get(`/api/skill/${id}`)).data
      return skill
    }
  }
}

export default connect(mapState, mapDispatch)(SkillUpdate)