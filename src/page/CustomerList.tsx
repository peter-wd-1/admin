import * as React from "react";
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Flex,
  Input,
  VStack,
  Container,
  InputGroup,
  InputLeftElement,
  InputLeftAddon,
  Text,
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbLink,
  HStack,
  IconButton,
  IconButtonProps,
  useDisclosure,
  Badge,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { FaSearch, FaBars, FaArrowDown } from "react-icons/fa";
import { MDrawer } from "../Drawer";
import { UserTable } from "../UserTable";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Data } from "../type";
import axios from "axios";
import { useSearchUser, useSearchUserName } from "../feature/query";
import { BsCaretDown, BsCaretDownFill } from "react-icons/bs";

async function fetchUsers({ pageParam = "0" }) {
  const { data } = await axios.get<Data>(
    `https://trvwdb8xrh.execute-api.us-east-1.amazonaws.com/beta/classtable?code=251-5435&mode=readAll&pageKey=${pageParam}`
  );
  return data;
}

export function CustomerList({ onLogout }: { onLogout: () => void }) {
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colorMode = useColorModeValue("dark", "light");
  const userlistQuery = useInfiniteQuery(["userslist"], fetchUsers, {
    getNextPageParam: (lastPage, pages) => lastPage.LastEvaluatedKey?.id,
    keepPreviousData: true,
  });
  const [searchQuery, setSearchQuery] = React.useState("nope");
  const [searchMethod, setSearchMethod] = React.useState("phone");
  const searchUserQuery = useSearchUser(searchQuery);
  const searchUserNameQuery = useSearchUserName(searchQuery);

  React.useEffect(() => {
    if (searchQuery === "") setSearchQuery("nope");
  }, [searchQuery]);

  return (
    <Box textAlign="center" fontSize="md">
      <MDrawer
        isOpen={isOpen}
        onClose={onClose}
        ref={btnRef}
        onLogout={onLogout}
      />
      <Grid p={5} gap={6}>
        <HStack>
          <IconButton
            size="md"
            icon={<FaBars />}
            aria-label="Menu"
            ref={btnRef}
            onClick={onOpen}
          />
          <ColorModeSwitcher justifySelf="flex-end" />
        </HStack>
      </Grid>
      <VStack>
        <Container maxW="container.lg">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="https://www.taestudionj.com/">
                <Badge colorScheme={"blue"}>TaeStudio</Badge>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Class Order List</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex justify="end">
            <InputGroup
              width="50%"
              borderColor={colorMode === "light" ? "gray.600" : "gray.300"}
              boxShadow="sm"
            >
              <InputLeftAddon
                zIndex="10000"
                children={
                  <Menu>
                    <MenuButton>
                      <IconButton
                        bg="transparent"
                        size="md"
                        aria-label="Menu"
                        icon={
                          <HStack>
                            <FaSearch color="gray.300" />
                            <BsCaretDownFill />
                          </HStack>
                        }
                      />
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          setSearchMethod("name");
                        }}
                      >
                        Name
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setSearchMethod("phone");
                        }}
                      >
                        Phone
                      </MenuItem>
                    </MenuList>
                  </Menu>
                }
              />
              <Input
                placeholder={
                  searchMethod === "phone"
                    ? "Search User by phone #"
                    : "Search User by name"
                }
                type={searchMethod === "phone" ? "number" : "text"}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
            </InputGroup>
          </Flex>
        </Container>
        <Container maxW="container.lg">
          <UserTable
            query={userlistQuery}
            searchMethod={searchMethod}
            searchQuery={
              searchMethod === "phone" ? searchUserQuery : searchUserNameQuery
            }
          />
        </Container>
      </VStack>
    </Box>
  );
}
