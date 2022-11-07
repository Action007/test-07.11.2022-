import React, { useState } from "react";
import { Form, ButtonToolbar, Button, Panel, FlexboxGrid } from "rsuite";
import { useSignUpMutation } from "../services/logInService";

const SignUp = () => {
  const [signUp] = useSignUpMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitHandler = () => {
    signUp({
      username,
      password,
      passconf: confirmPassword,
    });
  };

  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={12}>
        <Panel header={<h3>Sign up</h3>} bordered>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Username</Form.ControlLabel>
              <Form.Control
                name="name"
                value={username}
                onChange={setUsername}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control
                name="password"
                type="password"
                autoComplete="off"
                value={password}
                onChange={setPassword}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Confirm Password</Form.ControlLabel>
              <Form.Control
                name="password"
                type="password"
                autoComplete="off"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
            </Form.Group>
            <Form.Group>
              <ButtonToolbar>
                <Button appearance="primary" onClick={onSubmitHandler}>
                  Sign up
                </Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default SignUp;
