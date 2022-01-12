const express = require('express');
const app = express();
const path = require('path')
const {conn, syncAndSeed, models:{Client, Skill, Talent}} = require('./db')
const port = process.env.PORT || 3000;

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/clients', async(req, res, next)=>{
  try {
    const clients = await Client.findAll({
      include: [Talent]
    })
    res.send(clients)
  } catch(err){
    console.log(err)
  }
})

app.get('/api/skills', async(req, res, next)=>{
  try {
    const skills = await Skill.findAll({
      include: [Talent]
    })
    res.send(skills)
  } catch(err){
    console.log(err)
  }
})
app.get('/api/talents', async(req, res, next)=>{
  try {
    const talents = await Talent.findAll({
      include: [Client, Skill]
    })
    res.send(talents)
  } catch(err){
    console.log(err)
  }
})

app.get('/api/skill/:id', async(req, res, next)=>{
  try {
    const {id} = req.params
    const skill = await Skill.findByPk(id)
    //console.log('skill-->', skill)
    res.send(skill)
  } catch(err){
    console.log(err)
  }
})


const init = async()=>{
  try{
    await syncAndSeed()
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  } catch(err){
    console.log(err)
  }
}

init()