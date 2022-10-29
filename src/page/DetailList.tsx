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
  Button,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { FaSearch, FaBars, FaArrowLeft } from "react-icons/fa";
import { MDrawer } from "../Drawer";
import { UserDetailTable } from "../UserDetailTable";
import { useNavigate, useParams } from "react-router-dom";

export function DetailList({ onLogout }: { onLogout: () => void }) {
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { phoneNumber } = useParams();

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
          <Flex py="3" px="0" m="0">
            <Button
              px="2"
              m="0"
              bg="transparent"
              leftIcon={<FaArrowLeft />}
              color="blue.400"
              onClick={() => {
                navigate("/");
              }}
            >
              Back
            </Button>
          </Flex>
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
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/user">Details</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/user">{phoneNumber}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Container>
        <Container maxW="container.lg">
          <UserDetailTable />
        </Container>
      </VStack>
    </Box>
  );
}
