import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  useDisclosure,
  Link,
  VStack,
  IconButton,
  Button,
  DrawerFooter,
} from "@chakra-ui/react";
import React from "react";
import { MdExitToApp } from "react-icons/md";

export function MDrawer({
  ref,
  isOpen,
  onClose,
  onLogout,
}: {
  ref: any;
  isOpen: any;
  onClose: any;
  onLogout: () => void;
}) {
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={ref}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Links</DrawerHeader>
        <DrawerBody>
          <VStack align="stretch">
            <Link href="https://www.taestudionj.com">Home</Link>
            <Link href="https://www.tstudioqrcheacker.com">QR Chechker</Link>
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Button
            leftIcon={<MdExitToApp />}
            size="md"
            w="100px"
            onClick={() => {
              window.localStorage.removeItem("session");
              onLogout();
            }}
          >
            LogOut
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
