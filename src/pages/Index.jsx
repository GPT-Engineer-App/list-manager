import React, { useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Input, IconButton, Text, Heading, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddTodo = () => {
    if (!inputValue.trim()) {
      toast({
        title: "No content",
        description: "Todo can't be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, { id: Date.now(), content: inputValue }]);
    setInputValue("");
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <VStack spacing={8}>
          <Heading>Todo App</Heading>
          <HStack>
            <Input placeholder="Add a new todo" value={inputValue} onChange={handleInputChange} onKeyPress={handleEnterPress} />
            <IconButton icon={<FaPlus />} isRound="true" onClick={handleAddTodo} />
          </HStack>
          <VStack spacing={4} align="stretch">
            {todos.map((todo) => (
              <HStack key={todo.id}>
                <Text>{todo.content}</Text>
                <IconButton icon={<FaTrash />} isRound="true" onClick={() => handleDeleteTodo(todo.id)} />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
