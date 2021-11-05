import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/ActionCreators";
import {
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button,
  Col,
} from "reactstrap";

function LoginForm({ toggleModal }) {
  const dispatch = useDispatch();
  const authentication = useSelector((state) => state.authentication);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onChange" });

  const { ref: usernameRef, ...usernameRest } = register("username", {
    required: true,
    maxLength: "30",
  });
  const { ref: passwordRef, ...passwordRest } = register("password", {
    required: true,
    maxLength: "30",
  });

  const handleLogin = (userCredentials) => {
    dispatch(loginUser(userCredentials));
    setIsFormSubmitted(true);
  };

  useEffect(() => {
    if (isFormSubmitted && authentication.isAuthenticated) {
      setIsFormSubmitted(false);
      toggleModal();
    }
  }, [authentication.isAuthenticated, isFormSubmitted, toggleModal]);

  useEffect(() => {
    if (isFormSubmitted && authentication.errMess) {
      if (authentication.errMess.name === "IncorrectUsernameError")
        setError("username", {
          type: "serverValidation",
          message: "Username Not Found !",
        });
      if (authentication.errMess.name === "IncorrectPasswordError")
        setError("password", {
          type: "serverValidation",
          message: "Incorrect Password!",
        });
    }
  }, [authentication.errMess, setError, isFormSubmitted]);

  return (
    <div className="login_form">
      <Form onSubmit={handleSubmit(handleLogin)}>
        <FormGroup>
          <Label htmlFor="username">
            <span className="fa fa-user" /> Username
            <span style={{ color: "red" }}>*</span> :
          </Label>
          <Input
            type="text"
            name="loginUsername"
            invalid={errors.username ? true : false}
            innerRef={usernameRef}
            {...usernameRest}
          />
          {errors.username && (
            <FormFeedback invalid>
              {errors.username.type === "required" && (
                <span>Username Is Required!</span>
              )}
              {errors.username.type === "maxLength" && (
                <span>Username Can Contain Maximum 30 Characters!</span>
              )}
              {errors.username.type === "serverValidation" && (
                <span>{errors.username.message}</span>
              )}
            </FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">
            <span className="fa fa-lock" /> Password
            <span style={{ color: "red" }}>*</span> :
          </Label>
          <Input
            type="password"
            name="password"
            invalid={errors.password ? true : false}
            innerRef={passwordRef}
            {...passwordRest}
          />
          {errors.password && (
            <FormFeedback invalid>
              {errors.password.type === "required" && (
                <span>Password Is Required!</span>
              )}
              {errors.password.type === "maxLength" && (
                <span>Password Can Contain Maximum 30 Characters!</span>
              )}
              {errors.password.type === "serverValidation" && (
                <span>{errors.password.message}</span>
              )}
            </FormFeedback>
          )}
        </FormGroup>
        <FormGroup row>
          <Col sm={{ offset: "6", size: "3" }} className="p-2 ">
            <Button
              block
              type="button"
              color="dark"
              onClick={() => reset()}
              disabled={!isDirty}
            >
              Reset
            </Button>
          </Col>
          <Col sm="3" className="p-2">
            <Button block type="submit" color="danger" disabled={!isValid}>
              Login
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default LoginForm;
