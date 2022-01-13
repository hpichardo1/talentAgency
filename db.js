const { UUID, STRING, UUIDV4 } = require('sequelize')
const Sequelize  = require('sequelize')

const conn = new Sequelize(process.env.DATABASE_URL || "postgres://localhost/talentAgency")

const Client = conn.define('client', {
  name:{
    type: STRING
  }
})

const Skill = conn.define('skill', {
  name:{
    type: STRING 
  }
})

const Talent = conn.define('talent', {})

Talent.belongsTo(Client)
Client.hasMany(Talent)

Talent.belongsTo(Skill)
Skill.hasMany(Talent)



const syncAndSeed = async() =>{
  await conn.sync({ force: true }) // (ProductionOnly)This will drop exiting tables and repopulate them. 
  //Meaning, data isnt duplicated.
  // will sync models to the database instance that we created with sequelize.

  const [ Moe, Larry, Curly, Lucy, Ethyl ] = await Promise.all([
    Client.create({ name: 'Moe'}),
    Client.create({ name: 'Larry'}),
    Client.create({ name: 'Curly'}),
    Client.create({ name: 'Lucy'}),
    Client.create({ name: 'Ethyl'}),
  ])
  const [ Singing, Dancing, Acting, Juggling, PlateSpinning, LongDivision ] = await Promise.all([
    Skill.create({ name: 'Singing'}),
    Skill.create({ name: 'Dancing'}),
    Skill.create({ name: 'Acting'}),
    Skill.create({ name: 'Juggling'}),
    Skill.create({ name: 'Plate Spinning'}),
    Skill.create({ name: 'Long Division'}),
    Skill.create({ name: 'No Skill'}),
  ])
   await Promise.all([
    Talent.create({ clientId: 1, skillId: 2}),
    Talent.create({ clientId: 2, skillId: 2}),
    Talent.create({ clientId: 3, skillId: 3}),
    Talent.create({ clientId: 4, skillId: 1}),
    Talent.create({ clientId: 4, skillId: 2}),
    Talent.create({ clientId: 5, skillId: 6}),
    Talent.create({ clientId: 5, skillId: 5}),
    Talent.create({ clientId: 5, skillId: 4})
  ])

}

module.exports = {
  conn,
  syncAndSeed,
  models: {
    Client,
    Skill,
    Talent
  }
}