import { Card, CardHeader, CardBody } from "reactstrap";
import Loading from './LoadingComponent';

function EditorOuput({ srcDoc, preparingSrcDoc}) {
  return (
    <div className="editor_output">
      <Card>
        <CardHeader className="bg-dark text-white">Result</CardHeader>
        <CardBody className="p-0">
          {preparingSrcDoc ? (
            <Loading />
          ) : (
            <iframe
              srcDoc={srcDoc}
              title="output"
              width="100%"
              height="100%"
              frameBorder="0"
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default EditorOuput;
