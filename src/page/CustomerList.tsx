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
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { FaSearch, FaBars } from "react-icons/fa";
import { MDrawer } from "../Drawer";
import { UserTable } from "../UserTable";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Data } from "../type";
import axios from "axios";

async function fetchUsers({ pageParam = "0" }) {
  const { data } = await axios.get<Data>(
    `https://trvwdb8xrh.execute-api.us-east-1.amazonaws.com/beta/classtable?code=251-5435&mode=readAll&pageKey=${pageParam}`
  );
  return data;
}
async function fetchSearch(query: string) {
  const { data } = await axios.get<Data>(
    `https://trvwdb8xrh.execute-api.us-east-1.amazonaws.com/beta/classtable?mode=search&search=${query}`
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
  const searchUserQuery = useQuery(
    ["searchquery", searchQuery],
    async () => await fetchSearch(searchQuery)
  );

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
              <InputLeftAddon children={<FaSearch color="gray.300" />} />
              <Input
                placeholder="Search User by phone #"
                type="number"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
            </InputGroup>
          </Flex>
        </Container>
        <Container maxW="container.lg">
          <UserTable query={userlistQuery} searchQuery={searchUserQuery} />
        </Container>
      </VStack>
    </Box>
  );
}
