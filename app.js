const express = require ('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');

const { buildSchema} = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/graphql',graphqlHTTP({
    schema: buildSchema(`

        type Event{
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }
        schema{ 
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: ()=>{
            return ['readBook ','coding'];
        },
        createEvent: (args)=>{
         const eventName = args.name;
         return eventName;
        }
    }
    ,graphiql:true
}));

app.listen(5000);