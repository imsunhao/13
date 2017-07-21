const state = {
  user: {
    id: '',
    Code: '',
  },
};

const mutations = {
  updateUser (state, payload) {
    state.user = payload.amount;
  },
};

const actions = {};

const gatters = {};

export { state, mutations, actions, gatters };
