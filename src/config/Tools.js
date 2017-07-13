import {statusConfig, validateRule} from './PublicMethods';

function speckText (str) {
  // var request=  new URLRequest();
  let url = 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=' + encodeURI(str);        // baidu
  // url = "http://translate.google.cn/translate_tts?ie=UTF-8&tl=zh-CN&total=1&idx=0&textlen=19&prev=input&q=" + encodeURI(str); // google

  // request.url = encodeURI(url);
  // request.contentType = "audio/mp3"; // for baidu
  // request.contentType = "audio/mpeg"; // for google

  let n = new Audio(url);

  n.src = url;

  n.play();

  // $("...").play();
  // var sound = new Sound(request);
  // sound.play();
}

function autoValidate (option, cbs) {
  // function autoValidateRule(string, model) {
  //     return function (rule, value, callback) {
  //         if ((new RegExp(string, "g")).exec(value)) {
  //             return callback(new Error(model));
  //         }
  //         else {
  //             return callback();
  //         }
  //     };
  // }
  let temp = Object.create(null);
  let i = 0;
  for (let index in option) {
    if (option.hasOwnProperty(index)) {
      let type = typeof option[index];
      switch (type) {
      case 'object':
        temp[index] = [];
        for (let b in option[index]) {
          if (option[index].hasOwnProperty(b)) {
            temp[index].push({validator: validateRule[option[index][b]], trigger: 'blur'});
          }
        }
        break;
      case 'string':
        if (!option[index]) {
          temp[index] = [{validator: cbs[i++], trigger: 'blur'}];
        } else {
          temp[index] = [{validator: validateRule[option[index]], trigger: 'blur'}];
        }
        break;
      }
    }
  }
  return temp;
  /* autoValidate({
   pass:'',
   imsunhao:'vNull',
   name:['vNull','a']
   }, [
   function(rule, value, callback){
   console.log(123)
   }
   ]); */
}

function autoValidatePuls (obj) {
  for (let index in obj) {
    if (obj.hasOwnProperty(index)) {
      obj[index] = autoValidate(obj[index]);
    }
  }
  return obj;
}

function statusJudg (status, option) {
  let {
    s,         // 判断为 成功之后的 函数回调
    e,         // 判断为 失败之后的 函数回调
    show,      // 是否显示 成功与失败 后的 通知窗
    showS,     // 是否显示 成功      后的 通知窗
    showE,     // 是否显示 失败      后的 通知窗
    title,     // 手动设置 标题
    message,   // 手动设置 通知内容
    type,      // 手动设置 失败后提示的样式
  } = option;
  if (status < 10000) {
    if (show || showS) {
      this.$notify({
        title: title || statusConfig[status].title || '成功',
        message: message || statusConfig[status].message || statusConfig[status],
        type: 'success',
      });
    }
    if (s) s();
  } else {
    if (show || showE) {
      this.$notify({
        title: title || statusConfig[status].title || '失败',
        message: message || statusConfig[status].message || statusConfig[status],
        type: type || 'error',
      });
    }
    if (e) e();
  }
}

function publicMethods () {
  return {
    statusJudg,             // 自动判断 status 的值
  };
}

export {
  speckText,                 // 核心 语音播报
  autoValidate,              // 核心 自动prop组合 for validate验证
  autoValidatePuls,          // 核心 自动obj组合 for validate验证
  publicMethods,             // VUE 页面级别 必备函数
};
