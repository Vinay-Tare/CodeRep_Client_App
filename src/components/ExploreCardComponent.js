import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import EditorOuput from "./EditorOutputComponent";

function ExploreCard({ editor }) {
  const editorRating = editor.rating;
  const editorOwner = editor.owner;

  const editorDescription =
    editor.description.length <= 160
      ? editor.description
      : editor.description.substring(0, 160).concat(" . . .");

  const editorName =
    editor.name.length <= 30
      ? editor.name
      : editor.name
          .substring(0, editor.name.lastIndexOf(" ", 30))
          .concat(" . . .");

  const editorCreatedOn = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(Date.parse(editor.createdAt)));

  const srcDoc = `
        <html>
        <body>${editor.editorHTML}</body>
        <style>${editor.editorCSS}</style>
        <script>${editor.editorJavascript}</script>
        </html>
    `;

  return (
    <div className="explore_card">
      <Card>
        <CardHeader className="text-dark border border-info">
          <Row>
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
        </CardHeader>
        <CardBody className="p-2 border border-info border-top-0">
          <div className="ml-1" style={{ minHeight: "50px" }}>
            <span className="font-weight-light p-1">
              <span className="fa fa-list-alt" /> Description :{" "}
              {editorDescription}
            </span>
          </div>
          <hr className="my-3 bg-info" />
          <EditorOuput
            displayName={editorName}
            preparingSrcDoc={false}
            srcDoc={srcDoc}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default ExploreCard;
