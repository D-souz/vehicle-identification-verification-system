import layout from "./layout";
// import todo from "../pages/app/todo/store";
// import email from "../pages/app/email/store";
// import chat from "../pages/app/chat/store";
// import project from "../pages/app/projects/store";
// import kanban from "../pages/app/kanban/store";
// import calendar from "../pages/app/calender/store";
import auth from "../pages/auth/common/store";
import agents from "../pages/app/agents/agentsStore";
import enrollees from "../pages/app/enrollees/enrolleeStore";

const rootReducer = {
  layout,
  // todo,
  // email,
  // chat,
  // project,
  // kanban,
  // calendar,
  auth,
  agents,
  enrollees,
};
export default rootReducer;
