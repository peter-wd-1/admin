import React, { useState } from "react";
import {
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Table,
  Tbody,
  Td,
  Input,
  Text,
  HStack,
  IconButton,
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
  useColorModeValue,
  Spinner,
  Tfoot,
  Center,
  Flex,
  Container,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { BsGearFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import { AdjustPopover } from "./AdjustPopover";
import { Data } from "./type";

export function UserTable({
  query,
  searchQuery,
}: {
  query: UseInfiniteQueryResult<Data, any>;
  searchQuery?: UseQueryResult<Data, any>;
}) {
  const [pageKey, setPageKey] = useState("none");
  const initialFocusRef = React.useRef<any>(null);
  const colorMode = useColorModeValue("dark", "light");
  const navigate = useNavigate();
  const {
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = query;

  const data =
    searchQuery?.data?.Items && searchQuery?.data?.Items.length > 0
      ? {
          pages: [searchQuery.data],
        }
      : query.data;

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
        <TableCaption>
          {hasNextPage && (
            <Button
              isLoading={isFetching}
              bg="transparent"
              color="blue.400"
              onClick={() => {
                fetchNextPage();
              }}
              size="lg"
            >
              load more
            </Button>
          )}
        </TableCaption>
        <Thead
          position="sticky"
          top={0}
          zIndex="docked"
          bg={colorMode === "dark" ? "gray.50" : "gray.900"}
        >
          <Tr>
            <Th>Phone #</Th>
            <Th>User Name</Th>
            <Th>Class</Th>
            <Th>Qty</Th>
            <Th>Order ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(isFetching && !data) || searchQuery?.isLoading ? (
            Array.from({ length: 3 }).map(() => (
              <Tr>
                {Array.from({ length: 5 }).map(() => (
                  <Td>
                    <Skeleton height="20px" />
                  </Td>
                ))}
              </Tr>
            ))
          ) : (
            <>
              {data?.pages.map((page) =>
                page?.Items.map(
                  (item) =>
                    item.classcount !== "0" && (
                      <Tr
                        _hover={{
                          bg: colorMode === "light" ? "gray.900" : "gray.50",
                          cursor: "pointer",
                        }}
                      >
                        <Td>
                          <Text
                            textOverflow="ellipsis"
                            overflow="hidden"
                            maxWidth="150px"
                            onClick={() => {
                              navigate(`/user/${item.phonenumber}`);
                            }}
                          >
                            {item.phonenumber.split("-").join("")}
                          </Text>
                        </Td>
                        <Td>
                          <Tooltip label={item.studentName}>
                            <Text
                              textOverflow="ellipsis"
                              overflow="hidden"
                              maxWidth="150px"
                              onClick={() => {
                                navigate(`/user/${item.phonenumber}`);
                              }}
                            >
                              {item.studentName}
                            </Text>
                          </Tooltip>
                        </Td>
                        <Td>
                          <Tooltip label={item.className}>
                            <Text
                              textOverflow="ellipsis"
                              overflow="hidden"
                              maxWidth="150px"
                              onClick={() => {
                                navigate(`/user/${item.phonenumber}`);
                              }}
                            >
                              {item.className}
                            </Text>
                          </Tooltip>
                        </Td>
                        <Td>
                          <HStack>
                            <Text color="blue.600" as="b" px="2">
                              {item.classcount}
                            </Text>
                            <AdjustPopover
                              value={parseInt(item.classcount)}
                              id={item.id}
                            />
                          </HStack>
                        </Td>
                        <Td>
                          <Tooltip label={item.id}>
                            <Text
                              textOverflow="ellipsis"
                              overflow="hidden"
                              maxWidth="150px"
                              onClick={() => {
                                navigate(`/user/${item.phonenumber}`);
                              }}
                            >
                              {item.id}
                            </Text>
                          </Tooltip>
                        </Td>
                      </Tr>
                    )
                )
              )}
              {isFetching &&
                Array.from({ length: 3 }).map(() => (
                  <Tr>
                    {Array.from({ length: 5 }).map(() => (
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                    ))}
                  </Tr>
                ))}
            </>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
