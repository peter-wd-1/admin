import React, { useEffect, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { BsGearFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAdjustCount } from "./feature/query";
import { AnimatePresence, motion } from "framer-motion";

export function AdjustPopover({ value, id }: { value: number; id: string }) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: value,
      min: 0,
      onChange: (valueAsString, valueAsNumber) => {
        setCount(valueAsString);
      },
    });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  const countAdjust = useAdjustCount();
  const [count, setCount] = useState(value.toString());
  const toast = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (countAdjust.isSuccess && value.toString() !== count) {
      toast({
        title: "Updated.",
        description: "Count Updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else if (countAdjust.isError && value.toString() !== count) {
      toast({
        title: "Update Error.",
        description: "Update Count Failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [countAdjust.isSuccess, countAdjust.isError]);

  useEffect(() => {
    queryClient.invalidateQueries();
  }, [countAdjust.isSuccess]);

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <IconButton
          size="sm"
          icon={<BsGearFill color="gray.300" />}
          aria-label="setting"
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent boxShadow="lg" overflow="hidden">
          <PopoverArrow />
          <PopoverHeader>Adjust Qty.</PopoverHeader>
          <PopoverBody>
            <HStack>
              <Button {...dec}>-</Button>
              <Input
                value={value}
                {...input}
                readOnly
                onChange={(e) => {
                  setCount(e.target.value);
                }}
              />
              <Button {...inc}>+</Button>
            </HStack>
          </PopoverBody>
          <AnimatePresence>
            {count !== value.toString() && (
              <motion.div
                animate={{ height: "auto" }}
                initial={{ height: 0 }}
                exit={{ height: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 700,
                  damping: 50,
                  mass: 0.1,
                }}
              >
                <PopoverFooter
                  border="0"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  pb={4}
                >
                  <Box fontSize="sm">Qty has changed</Box>
                  <ButtonGroup size="sm">
                    <Button
                      isLoading={countAdjust.isLoading}
                      bg="green.200"
                      color="green.800"
                      onClick={() => {
                        countAdjust.mutate({ id, count });
                      }}
                    >
                      Save
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </motion.div>
            )}
          </AnimatePresence>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
