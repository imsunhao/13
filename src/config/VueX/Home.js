const state = {
  data: {
    'zxData': [
      {
        'hpbh': '10013',
        'sl': 42,
        'mc': '尚赫紧致霜（支）',
        'xh': '1',
      },
    ],
    'sxData': [
      {
        'hpbh': '10066',
        'sl': 5,
        'mc': '尚赫瑞诺丝精油系列礼盒',
        'xh': '7',
      },
    ],
    'bh': 'S08SP17071700088',
    'dz': '111000辽宁省辽阳市白塔区卫国路67号君悦天下5A号楼1单元1层1号',
    'lxr': '吴艳新',
    'tel': null,
    'sxs': 3,
    'zxs': 6,
  },
};

const mutations = {
  updateData (state, payload) {
    state.data = payload.amount;
  },
};

const actions = {};

const gatters = {};

export { state, mutations, actions, gatters };
