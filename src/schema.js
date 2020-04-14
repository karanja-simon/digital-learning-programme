const { gql } = require('apollo-server');


const typeDefs = gql`
    type Query {
        school(id: String!): School
        schools(pageSize: Int!, after: String): SchoolConnection!
        schoolByName(school: String!): School!
        schoolsByCounty(county: String!, pageSize: Int!, after: String): SchoolConnection!
    }

    type School {
        id: String!
        name: String!
        zone: String!
        county: County!
        ldds: Int
        fid: Int
    }

    type SchoolConnection {
        cursor: String
        hasMore: Boolean
        schools: [School]!
    }

    type County {
        id: Int!
        name: String!
        subCounty: SubCounty
    }

    type SubCounty {
        id: Int!
        name: String!
    }
`;


module.exports = typeDefs;