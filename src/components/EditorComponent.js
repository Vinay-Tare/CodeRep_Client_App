import { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "reactstrap";
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
        <Container fluid className="p-3">
          <Row noGutters>
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
              <EditorOuput srcDoc={srcDoc} preparingSrcDoc={preparingSrcDoc} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Editor;
