const state = {
  http: {
    ip: '192.168.191.1',
    port: 18080,
    projectName: {
      ShenYan: '/WebServices/WbsShenYang.asmx',
      JiNan: '/WebServices/WbsJiNan.asmx',
    },
    CK: {
      ShenYan: '沈阳',
      JiNan: '济南',
    },
  },
};

const mutations = {
  updateHttp (state, payload) {
    state.http = payload.amount;
  },
};

const actions = {};

const gatters = {};

export { state, mutations, actions, gatters };
