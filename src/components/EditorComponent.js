import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Prompt } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Alert, Input, Button } from "reactstrap";
import EditorInput from "./EditorInputComponent";
import EditorOuput from "./EditorOutputComponent";
import Loading from "./LoadingComponent";
import SaveRatingModal from "./SaveRatingModal";
import SaveEditorModal from "./SaveEditorModalComponent";

function Editor({
  editor = null,
  isLoading = false,
  errMess = null,
  untitled = true,
}) {
  const authentication = useSelector((state) => state.authentication);
  const [html, setHTML] = useState("");
  const [css, setCSS] = useState("");
  const [javascript, setJavascript] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [preparingSrcDoc, setPreparingSrcDoc] = useState(false);
  const [isSaveEditorModalOpen, setIsSaveEditorModalOpen] = useState(false);
  const [isSaveRatingModalOpen, setIsSaveRatingModalOpen] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const toggleSaveEditorModal = () =>
    setIsSaveEditorModalOpen(!isSaveEditorModalOpen);

  const toggleSaveRatingModal = () => {
    setIsSaveRatingModalOpen(!isSaveRatingModalOpen);
  };

  const editorName = editor ? editor.name : "";
  const editorDescription =
    (editor && editor.description
      ? editor.description
      : "No Description About Editor") || "";
  const editorOwner =
    (editor &&
      authentication.username &&
      (authentication.username === editor.owner.username
        ? "You"
        : editor.owner.username)) ||
    "";
  const editorRatingValue = editor ? editor.ratingValue : "";
  const editorRatingCount = editor ? editor.ratingCount : "";
  const editorRating =
    editorRatingValue && editorRatingCount
      ? editorRatingValue / editorRatingCount
      : "No Ratings";
  const editorCreatedOn = editor
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(Date.parse(editor.createdAt)))
    : "";
  const editorCreatedAt = editor
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "long",
        timeZoneName: "long",
      }).format(new Date(Date.parse(editor.createdAt)))
    : "";
  const editorUpdatedAt = editor
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "long",
        timeZoneName: "long",
      }).format(new Date(Date.parse(editor.updatedAt)))
    : "";

  useEffect(() => {
    const loadEditor = () => {
      setHTML(editor.editorHTML);
      setCSS(editor.editorCSS);
      setJavascript(editor.editorJavascript);
    };

    if (!untitled && !isLoading && errMess == null && editor != null) {
      loadEditor();
    }
  }, [editor, isLoading, errMess, untitled]);

  useEffect(() => {
    const alertUser = (event) => {
      const e = event || window.event;
      e.preventDefault();
      if (e) {
        e.returnValue = "";
      }
      return "";
    };

    window.addEventListener("beforeunload", alertUser);

    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  useEffect(() => {
    setPreparingSrcDoc(true);
    const perpareSrcDoc = setTimeout(() => {
      setPreparingSrcDoc(false);
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${javascript}</script>
      </html>
      `);
    }, 1000);

    return () => {
      setPreparingSrcDoc(false);
      clearTimeout(perpareSrcDoc);
    };
  }, [html, css, javascript]);

  if (isLoading) {
    return <Loading />;
  } else if (errMess != null) {
    return (
      <Alert color="danger" className="p-5 m-5 h5 text-center">
        {errMess}
      </Alert>
    );
  } else if (!untitled && editor == null) {
    return (
      <Alert color="danger" className="p-5 m-5 h5 text-center">
        No Such Editor
      </Alert>
    );
  } else {
    return (
      <div className="editor">
        <Prompt
          when={unsavedChanges}
          message="You Have Unsaved Changes, Leaving This Page May Reset Them !
          Are You Sure You Want To Leave?"
        />
        <SaveEditorModal
          isModalOpen={isSaveEditorModalOpen}
          toggleModal={toggleSaveEditorModal}
          previousEditorData={editor}
          editorInputData={{
            editorHTML: html,
            editorCSS: css,
            editorJavascript: javascript,
          }}
        />
        <Container fluid>
          {!untitled && editor && (
            <Row className="p-3 bg-light">
              <Col xs="12" md="6">
                <div className="p-2 float-md-left">
                  <div>
                    <em>{editorName}</em>
                  </div>
                  <hr className="my-1 d-none d-md-block" />
                  <div>
                    ( {editorRating} Stars{" "}
                    <span className="fa fa-star-half-o text-warning" /> )
                  </div>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="p-2 float-md-right">
                  <div>
                    <span className="fa fa-calendar" /> Created On :{" "}
                    {editorCreatedOn}
                  </div>{" "}
                  <hr className="my-1" />
                  <div>
                    <span className="fa fa-user" /> Created By :{" "}
                    <Link
                      to={`/user/${editor.owner.username}`}
                      className="text-decoration-none text-reset"
                      title="Click To Open User Profile"
                    >
                      {editorOwner}
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          )}
          {unsavedChanges && (
            <Row className="p-3 bg-dark align-items-center">
              <Col sm={{ offset: "3", size: "4" }} className="p-3">
                <span className="text-light">
                  You have unsaved changes, Click to save the Editor !
                </span>
              </Col>
              <Col sm="3">
                <Button
                  block
                  outline
                  color="success"
                  onClick={toggleSaveEditorModal}
                >
                  Save Editor
                </Button>
              </Col>
            </Row>
          )}
          <Row noGutters className="p-3">
            <Col xs="12" md="4">
              <EditorInput
                mode="html"
                displayName="HTML"
                value={html}
                onValueChange={(editorHTML) => {
                  setHTML(editorHTML);
                  setUnsavedChanges(true);
                }}
              />
            </Col>
            <Col xs="12" md="4">
              <EditorInput
                mode="css"
                displayName="CSS"
                value={css}
                onValueChange={(editorCSS) => {
                  setCSS(editorCSS);
                  setUnsavedChanges(true);
                }}
              />
            </Col>
            <Col xs="12" md="4">
              <EditorInput
                mode="javascript"
                displayName="Javascript"
                value={javascript}
                onValueChange={(editorJavascript) => {
                  setJavascript(editorJavascript);
                  setUnsavedChanges(true);
                }}
              />
            </Col>
            <Col xs="12">
              <EditorOuput
                srcDoc={srcDoc}
                preparingSrcDoc={preparingSrcDoc}
                displayName="Result"
              />
            </Col>
          </Row>
          {!untitled && editor && (
            <Row className="p-3 bg-dark align-items-center">
              <SaveRatingModal
                isModalOpen={isSaveRatingModalOpen}
                toggleModal={toggleSaveRatingModal}
                editorId={editor._id}
              />
              <Col sm={{ offset: "3", size: "3" }} className="p-3 text-center">
                <span className="text-light h6">Rate Editor :</span>
              </Col>
              <Col sm="3">
                <Button
                  block
                  outline
                  color="warning"
                  onClick={toggleSaveRatingModal}
                >
                  Save Rating
                </Button>
              </Col>
            </Row>
          )}
          {!untitled && editor && (
            <Row className="p-3 bg-light">
              <Col xs="12">
                <p>
                  <span className="fa fa-info-circle" /> <b>Editor Details :</b>
                </p>
                <hr className="mt-2 bg-dark" />
                <p>
                  <span className="fa fa-user-circle-o" /> Created By :{" "}
                  <span>
                    <Link
                      to={`/user/${editor.owner.username}`}
                      className="text-decoration-none text-reset"
                      title="Click To Open User Profile"
                    >
                      {editorOwner}
                    </Link>
                  </span>
                </p>
                <p>
                  <span className="fa fa-pencil-square-o" /> Editor Name :{" "}
                  {editorName}
                </p>
                <p>
                  <span className="fa fa-star-o" /> Editor Rating :{" "}
                  {editorRating} Stars{" "}
                  <span className="fa fa-star-half-o text-warning" />
                </p>
                <Container fluid className="p-0 my-3">
                  <Row>
                    <Col xs="12" md="auto" className="mb-2">
                      <span className="fa fa-list-alt" /> Description :{" "}
                    </Col>
                    <Col xs="12" md="10">
                      <Input
                        type="textarea"
                        value={editorDescription}
                        rows="5"
                        readOnly
                      />
                    </Col>
                  </Row>
                </Container>
                <p>
                  <span className="fa fa-calendar" /> Updated At :{" "}
                  {editorUpdatedAt}
                </p>
                <p>
                  <span className="fa fa-calendar" /> Created At :{" "}
                  {editorCreatedAt}
                </p>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    );
  }
}

export default Editor;
