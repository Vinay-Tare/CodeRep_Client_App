import { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Input } from "reactstrap";
import EditorInput from "./EditorInputComponent";
import EditorOuput from "./EditorOutputComponent";
import Loading from "./LoadingComponent";

function Editor({
  editor = null,
  isLoading = false,
  errMess = null,
  untitled = true,
}) {
  const [html, setHTML] = useState("");
  const [css, setCSS] = useState("");
  const [javascript, setJavascript] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [preparingSrcDoc, setPreparingSrcDoc] = useState(false);

  const editorName = editor ? editor.name : "";
  const editorDescription = editor ? editor.description : "";
  const editorOwner = editor ? editor.owner : "";
  const editorRating = editor ? editor.rating : "";
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
                    ( {editorRating}{" "}
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
                    <span className="fa fa-user" /> Created By : {editorOwner}
                  </div>
                </div>
              </Col>
            </Row>
          )}
          <Row noGutters className="p-3">
            <Col xs="12" md="4">
              <EditorInput
                mode="html"
                displayName="HTML"
                value={html}
                onValueChange={(editorHTML) => setHTML(editorHTML)}
              />
            </Col>
            <Col xs="12" md="4">
              <EditorInput
                mode="css"
                displayName="CSS"
                value={css}
                onValueChange={(editorCSS) => setCSS(editorCSS)}
              />
            </Col>
            <Col xs="12" md="4">
              <EditorInput
                mode="javascript"
                displayName="Javascript"
                value={javascript}
                onValueChange={(editorJavascript) =>
                  setJavascript(editorJavascript)
                }
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
            <Row className="p-3 bg-light">
              <Col xs="12">
                <p>
                  <span className="fa fa-info-circle" /> <b>Editor Details :</b>
                </p>
                <hr className="mt-2 bg-dark" />
                <p>
                  <span className="fa fa-user-circle-o" /> Created By :{" "}
                  {editorOwner}
                </p>
                <p>
                  <span className="fa fa-pencil-square-o" /> Editor Name :{" "}
                  {editorName}
                </p>
                <p>
                  <span className="fa fa-star-o" /> Editor Rating :{" "}
                  {editorRating}{" "}
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
