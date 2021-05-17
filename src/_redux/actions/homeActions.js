const INCREMENT = "INCREMENT"

function incrementAction(data){
  return {
    type: INCREMENT,
    data
  }
}

export function incrementValue (value) {
    return dispatch => {
        setTimeout(()=>{
          dispatch(incrementAction(value))
        },1000)
    }
}