import React from "react";
import {
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Table,
  Flex,
  Tbody,
  Td,
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
  Tooltip,
  PopoverTrigger,
  Popover,
  Portal,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Button,
  useNumberInput,
  PopoverFooter,
  PopoverArrow,
  Box,
  ButtonGroup,
  Skeleton,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { BsGearFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useSearchUser } from "./feature/query";
import { MdCheckCircle } from "react-icons/md";

export function UserDetailTable() {
  const { phoneNumber } = useParams();
  const { isLoading, searchResult } = useSearchUser(phoneNumber || "");
  const colorMode = useColorModeValue("dark", "light");

  return (
    <TableContainer
      shadow="sm"
      rounded="md"
      border="1px"
      borderColor={colorMode === "light" ? "gray.600" : "gray.300"}
      color={colorMode === "light" ? "gray.200" : "gray.600"}
      maxH="80vh"
      overflow="hidden"
      overflowY="scroll"
      overflowX="scroll"
    >
      <Table variant="simple">
        <TableCaption>Customer {phoneNumber}</TableCaption>
        <Thead
          position="sticky"
          top={0}
          zIndex="docked"
          bg={colorMode === "dark" ? "gray.50" : "gray.900"}
        >
          <Tr>
            <Th>ID</Th>
            <Th>Class</Th>
            <Th>Redeem Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading
            ? Array.from({ length: 3 }).map(() => (
                <Tr>
                  {Array.from({ length: 5 }).map(() => (
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                  ))}
                </Tr>
              ))
            : searchResult!.Items.map((item) => (
                <Tr
                  _hover={{
                    bg: colorMode === "light" ? "gray.900" : "gray.50",
                    cursor: "pointer",
                  }}
                >
                  <Td verticalAlign="top">
                    <Text
                      textOverflow="ellipsis"
                      overflow="hidden"
                      maxWidth="150px"
                    >
                      {item.id}
                    </Text>
                  </Td>
                  <Td verticalAlign="top">
                    <Text>{item.className}</Text>
                  </Td>
                  <Td>
                    <List>
                      {item.redeemdate ? (
                        item.redeemdate.map((date) => (
                          <ListItem my="2px">
                            <ListIcon as={MdCheckCircle} color="green.400" />
                            {date}
                          </ListItem>
                        ))
                      ) : (
                        <Tooltip label="Redeem date data only available for newly updated redeems.">
                          <Text color="gray.400">Data Not Available</Text>
                        </Tooltip>
                      )}
                    </List>
                  </Td>
                </Tr>
              ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
