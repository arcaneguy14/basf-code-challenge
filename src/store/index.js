import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export const wsutil = new Vuex.Store({
    state : {
        
    },
    getters : {
        
    },
    mutations : {
        
    },
    actions : {
      getCountries(){
            axios.defaults.headers.post['Content-Type'] = 'application/json';

            const headers = {
                headers: {'Authorization': `JWT ${wsutil.state.jwtToken}`}
            };

          return new Promise((resolve, reject) => {

            let userUrl = 'https://restcountries.com/v2/all'

              axios.get(userUrl, headers)
              .then(response => {
                  resolve(response);
              })
              .catch(function(error){
                  reject(error);
              });
          });
        },
    }
});

//Store current action
wsutil.subscribeAction((action, state) => {
  //if (action.type != 'refreshJWT'){
      state.curAct = action.type;
  //}
  state.temp = action.type;
});

// Add jwt token if token in state in available
/*
axios.interceptors.request.use((setting) => {
  if (wsutil.state.jwtToken != null){
      setting.headers['Authorization'] = 'JWT ' + wsutil.state.jwtToken;
  }
  return setting;
});
*/