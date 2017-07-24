const state = {
  data: null,
};

const mutations = {
  updateData (state, payload) {
    state.data = payload.amount;
  },
};

const actions = {};

const gatters = {};

export { state, mutations, actions, gatters };
