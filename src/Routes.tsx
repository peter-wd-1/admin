import { Box, Container, Heading, Center, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, PathRouteProps } from "react-router-dom";
import { CustomerList } from "./page/CustomerList";
import { DetailList } from "./page/DetailList";
import { FaBomb } from "react-icons/fa";
import { Login } from "./page/Login";

export function AppRoutes() {
  // login check
  const [isLogin, setIsLogin] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const session = window.localStorage.getItem("session");
    if (session) {
      setIsLogin(true);
    }
  }, [isSubmit]);

  const logout = () => {
    setIsLogin(false);
    setIsSubmit(false);
  };

  return (
    <Routes>
      {isLogin ? (
        <Route path="/">
          <Route path="" element={<CustomerList onLogout={logout} />} />
          <Route path="user/" element={<UserNotFound />} />
          <Route
            path="user/:phoneNumber"
            element={<DetailList onLogout={logout} />}
          />
        </Route>
      ) : (
        <Route path="/">
          <Route
            path=""
            element={
              <Login
                isSubmit={isSubmit}
                onSubmit={(flag: boolean) => setIsSubmit(flag)}
              />
            }
          />
          <Route path="user/" element={<PermissionError />} />
          <Route path="user/:phoneNumber" element={<PermissionError />} />
        </Route>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function UserNotFound() {
  return (
    <Container>
      <Center>
        <Heading>User ID Not Found </Heading>
      </Center>
    </Container>
  );
}

export function NotFound() {
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Heading>Page Not Found :(</Heading>
    </Flex>
  );
}

export function PermissionError() {
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Heading>Permission Not Allowed. Login First</Heading>
    </Flex>
  );
}
