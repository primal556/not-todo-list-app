import { Switch, Route } from "wouter";
import NotTodoList from "@/pages/not-todo-list";

function Router() {
  return (
    <Switch>
      <Route path="/" component={NotTodoList} />
    </Switch>
  );
}

function App() {
  return <Router />;
}

export default App;
