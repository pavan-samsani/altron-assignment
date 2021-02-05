const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require("graphql");

const {
  nodeDefinitions,
  globalIdField,
  fromGlobalId,
  connectionFromArray,
  connectionArgs,
  connectionDefinitions,
  mutationWithClientMutationId,
} = require("graphql-relay");

const {
  getArea,
  getSkill,
  getFrontEnd,
  getBackEnd,
  createSkill,
} = require("../repository");

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case "Area":
        return getArea(id);
      case "Skill":
        return getSkill(id);
    }
  },
  (obj) => (obj.skills ? areaType : skillType)
);

const skillType = new GraphQLObjectType({
  name: "Skill",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    name: {
      type: GraphQLString,
    },
  }),
});

const { connectionType: skillConnection } = connectionDefinitions({
  nodeType: skillType,
});

const areaType = new GraphQLObjectType({
  name: "Area",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    name: {
      type: GraphQLString,
    },
    skills: {
      type: skillConnection,
      args: connectionArgs,
      resolve: (area, args) =>
        connectionFromArray(area.skills.map(getSkill), args),
    },
  }),
});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    backEnd: {
      type: areaType,
      resolve: () => getBackEnd(),
    },
    frontEnd: {
      type: areaType,
      resolve: () => getFrontEnd(),
    },
    node: nodeField,
  }),
});

const skillMutation = mutationWithClientMutationId({
  name: "IntroduceSkill",
  inputFields: {
    skillName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    areaId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    skill: {
      type: skillType,
      resolve: (payload) => getSkill(payload.skillId),
    },
    area: {
      type: areaType,
      resolve: (payload) => getArea(payload.areaId),
    },
  },
  mutateAndGetPayload: ({ skillName, areaId }) => {
    const newSkill = createSkill(skillName, areaId);
    return {
      sillId: newSkill.id,
      areaId,
    };
  },
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    introduceSkill: skillMutation,
  }),
});

module.exports = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
