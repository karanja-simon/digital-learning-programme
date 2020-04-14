const { paginatedResults } = require('./utils');

const resolvers = {
    Query: {
        school: (_, __, ) => {
            return {}
        },

        schools: async (_, { pageSize = 5, after }, { dataSources }) => {
            const allSchools = await dataSources.dlpAPI.getAllSchools();
            const schools = paginatedResults({
                after,
                pageSize,
                results: allSchools
            });

            return {
                schools,
                cursor: schools.length ? schools[schools.length - 1].cursor : null,
                hasMore: schools.length ? schools[schools.length - 1].cursor !== allSchools[allSchools.length -1].cursor : false
            }
        },

        schoolByName: async (_, { school }, { dataSources }) => {
            return await dataSources.dlpAPI.getSchoolByName(school);
        },
        
        schoolsByCounty: async (_, { county, pageSize = 5, after }, { dataSources }) => {
            const allSchools = await dataSources.dlpAPI.getAllSchoolsByCounty(county);
            const schools = paginatedResults({
                after,
                pageSize,
                results: allSchools
            });

            return {
                schools,
                cursor: schools.length ? schools[schools.length - 1].cursor : null,
                hasMore: schools.length ? schools[schools.length - 1].cursor !== allSchools[allSchools.length -1].cursor : false
            }
        }
    }
};


module.exports = resolvers;