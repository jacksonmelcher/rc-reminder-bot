/* 
Just going to put some comments and test stuff within node to make the beginning 
stages go faster. When I get to a point where it can be interacted with I will 
connect it to Glip.
*/
import moment from "moment";

const showTheTime = () => {
  console.clear();
  console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));
};

const date = "2020-04-13T14:05:00-07:00";
console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));

showTheTime(); // for the first load
setInterval(showTheTime, 250); // update it periodically
