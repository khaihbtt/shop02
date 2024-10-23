import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  // Lấy hàm createProduct từ zustand store
  const toast = useToast()
  const { createProduct } = useProductStore();

  // Hàm xử lý khi nhấn nút Add Product
  const handleAddProduct = async () => {
    // Gọi hàm createProduct và nhận kết quả trả về
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "error",
        description: message,
        status: "error",
        isClosable: true,

      })
    } else {
      toast({
        title: "success",
        description: message,
        status: "success",
        isClosable: true,

      })
    }
    // In kết quả ra console
    setNewProduct({name: "", price: "", image: ""})
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create Product
          <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"lg"}>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />

              <Button colorScheme="blue" onClick={handleAddProduct} w={'full'}>
                Add Product
              </Button>
            </VStack>
          </Box>
        </Heading>
      </VStack>
    </Container>
  );
};

export default CreatePage;
