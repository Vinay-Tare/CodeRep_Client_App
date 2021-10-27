import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEditors } from "../redux/ActionCreators";
import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Editor from "./EditorComponent";

function Main() {
  const editors = useSelector((state) => state.editors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEditors());
  }, [dispatch]);

  return (
    <div className="main">
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route
          exact
          path="/editor/untitled"
          component={() => <Editor untitled={true} />}
        />
        <Route
          exact
          path="/editor/:editorId"
          component={({ match }) => (
            <Editor
              untitled={false}
              editor={editors.editors[match.params.editorId]}
              isLoading={editors.isLoading}
              errMess={editors.errMess}
            />
          )}
        />
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
  );
}

export default Main;
