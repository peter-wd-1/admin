import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Flex,
  Center,
  VStack,
  Text,
  Heading,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
  InputRightElement,
  Button,
  useToast,
  useColorModeValue,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { FaKey } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { BiShow, BiHide } from "react-icons/bi";

export function Login({
  isSubmit,
  onSubmit,
}: {
  isSubmit: boolean;
  onSubmit: (flag: boolean) => void;
}) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const onShowHide = () => setShow(!show);
  const toast = useToast();
  const colorMode = useColorModeValue("dark", "light");

  useEffect(() => {
    if (isSubmit && password === "adminStudio1!") {
      toast({
        title: "Permission Granted.",
        description: "Key has been verified. Permission Granted",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      window.localStorage.setItem("session", "true");
      onSubmit(false);
    } else if (isSubmit && password !== "adminStudio1!") {
      toast({
        title: "Wrong Password.",
        description: "We've got wrong password.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      onSubmit(false);
    }
  }, [isSubmit, password]);

  return (
    <>
      <Container w="100vw" h="100vh">
        <Flex justifyContent="center" alignItems="center" w="100%" h="100%">
          <Box
            w="100%"
            h="400px"
            border="1px"
            borderColor={colorMode === "light" ? "gray.600" : "gray.300"}
            rounded="lg"
            boxShadow="lg"
            position="relative"
            bg={colorMode === "light" ? "gray.700" : "gray.50"}
          >
            <ColorModeSwitcher
              justifySelf="flex-end"
              position="absolute"
              right="0px"
            />
            <Center w="1005" h="100%">
              <VStack align={"start"}>
                <Heading>
                  <Text color="blue.300">TaeStudio</Text> Admin
                </Heading>
                <Text>Please, Enter a privided admin key</Text>
                <InputGroup
                  size="sm"
                  boxShadow="sm"
                  w="auto"
                  overflow="hidden"
                  rounded="sm"
                >
                  <InputLeftAddon children={<FaKey />} />
                  <Input
                    bg={colorMode === "light" ? "gray.700" : "white"}
                    placeholder="Password"
                    type={show ? "text" : "password"}
                    focusBorderColor={
                      colorMode === "light" ? "gray.400" : "gray.400"
                    }
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <InputRightElement
                    mx="1.7rem"
                    children={
                      <AnimatePresence>
                        {password && (
                          <motion.div
                            animate={{ x: 0 }}
                            initial={{ x: 80 }}
                            exit={{ x: 80 }}
                            transition={{
                              type: "spring",
                              stiffness: 700,
                              damping: 50,
                              mass: 0.1,
                            }}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <IconButton
                              icon={show ? <BiShow /> : <BiHide />}
                              size="xs"
                              bg="transparent"
                              mx="2px"
                              aria-label="password visibility"
                              onClick={onShowHide}
                            />
                            <Button
                              size="xs"
                              rounded="sm"
                              bg="green.500"
                              color="green.100"
                              onClick={() => {
                                onSubmit(true);
                              }}
                            >
                              Login
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    }
                  />
                </InputGroup>
              </VStack>
            </Center>
          </Box>
        </Flex>
      </Container>
    </>
  );
}
