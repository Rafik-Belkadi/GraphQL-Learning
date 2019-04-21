const { GraphQLServer } = require('graphql-yoga')

// 1

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
// 2
const resolvers = {
   Query: {
       info: () => 'This is the API of a Hackernews Clone',
       feed: () => links,
       byid: (_,{id}) => links[id]
   },
   Mutation: {
       post: (parent,args) => {
           const link = {
               id: `link-${idCount++}`,
               description: args.description,
               url: args.url
           }
           links.push(link)
           return link
       },
       updateLink: (parent,args) => {
            const selected = links[args.id]
            selected.url = args.url
            selected.description = args.description
            return selected
       },
       deleteLink: (parent,args) => {
            const selected = links.pop(args.id)
            return selected
       }
   }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})
server.start( () => console.log(`Server is running on http://localhost:4000`))
