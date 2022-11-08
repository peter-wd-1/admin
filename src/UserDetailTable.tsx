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
  Text,
  HStack,
  IconButton,
  Tooltip,
  Skeleton,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Center,
} from "@chakra-ui/react";
import { BsGearFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useSearchUser } from "./feature/query";
import { MdCheckCircle } from "react-icons/md";
import { AdjustPopover } from "./AdjustPopover";
import QRCode from "react-qr-code";
import { FaQrcode } from "react-icons/fa";

export function UserDetailTable({
  isAdjustLoading,
}: {
  isAdjustLoading?: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { phoneNumber } = useParams();
  const { isLoading, data } = useSearchUser(phoneNumber || "");
  const colorMode = useColorModeValue("dark", "light");
  const [QRCodeValue, setQrCodeValue] = useState("");

  return (
    <TableContainer
      shadow="sm"
      rounded="md"
      border="1px"
      borderColor={colorMode === "light" ? "gray.600" : "gray.300"}
      color={colorMode === "light" ? "gray.200" : "gray.600"}
      maxH="80vh"
      overflow="scroll"
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
            <Th>QR-CODE</Th>
            <Th>Class</Th>
            <Th>Redeem Date</Th>
            <Th>Qty</Th>
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
            : data!.Items.sort((a, b) =>
                parseInt(a.id.split("-").join("")) >
                parseInt(b.id.split("-").join(""))
                  ? -1
                  : 1
              ).map((item) => (
                <Tr
                  _hover={{
                    bg: colorMode === "light" ? "gray.900" : "gray.50",
                  }}
                >
                  <Td verticalAlign="top">
                    <HStack>
                      <Text
                        textOverflow="ellipsis"
                        overflow="hidden"
                        maxWidth="150px"
                      >
                        {item.id}
                      </Text>
                      <IconButton
                        size="sm"
                        icon={<FaQrcode color="gray.300" />}
                        aria-label="setting"
                        onClick={(e) => {
                          console.log("clicked qr:", item.id);
                          setQrCodeValue(item.id);
                          onOpen();
                        }}
                      />
                    </HStack>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>QR Code</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Center p="20px">
                            <QRCode value={`${QRCodeValue}`} />
                          </Center>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
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
                  <Td>
                    <HStack>
                      <Text
                        color={item.classcount === "0" ? "red.600" : "blue.600"}
                        as="b"
                        px="2"
                      >
                        {item.classcount}
                      </Text>
                      <AdjustPopover
                        value={parseInt(item.classcount)}
                        id={item.id}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
