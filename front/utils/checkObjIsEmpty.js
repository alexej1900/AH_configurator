
export default  function checkObjIsEmpty(obj){
  for (let key in obj) {
    return false;
  }
  return true;
}
