import { useSelector } from "react-redux";

export default  function getModifications(room) {
  const roomType = useSelector(state => state.roomType);
  return roomType[room.toLowerCase()]?.modifications;  
}
