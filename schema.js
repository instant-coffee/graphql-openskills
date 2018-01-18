const fetch = require('node-fetch')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')

// const x = fetch(
//   'http://api.dataatwork.org/v1/jobs'
// ).then(res => res.text())

const SkillType = new GraphQLObjectType({
  name: 'SKILL',
  description: '...',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: data =>
        console.log(data)
        // data.name
    },
    uuid: {
      type: GraphQLString, 
      resolve: data =>
        data[0].uuid
    }
  })
})

const JobType = new GraphQLObjectType({
  name: 'JOB',
  description: '...',

  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: data =>
        data.title
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      job: {
        type: JobType,
        args: {
          id: {type: GraphQLString}
        },
        resolve: (root, args) => fetch(
          `http://api.dataatwork.org/v1/jobs/${args.id}`
        ).then(res => res.json())
      },
      skills: {
        type: SkillType,
        args: {
          // id: { type: GraphQLString }
        },
        resolve: (root, args) => fetch(
          `http://api.dataatwork.org/v1/skills`
        ).then(res => res.json())
      }
    })
  })
})