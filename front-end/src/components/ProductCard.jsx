import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react"; 
import { EditIcon, DeleteIcon } from "@chakra-ui/icons"; 
import { useProductStore } from "../store/product"; 
import { useState } from "react"; 

const ProductCard = ({ product }) => { 
  if (!product) return null; // Trả về null nếu không có product

  const { updateProduct, deleteProduct } = useProductStore(); // Lấy hàm deleteProduct từ store
  const toast = useToast(); // Tạo thông báo toast
  const { isOpen, onOpen, onClose } = useDisclosure(); // Quản lý trạng thái mở/đóng modal
  const [updateProductData, setUpdateProductData] = useState({ ...product }); // Trạng thái sản phẩm để cập nhật
  const [imagePreview, setImagePreview] = useState(product.image); // Trạng thái để hiển thị hình ảnh tạm thời

  const handleDeleteProduct = async (pid) => { 
    const { success, message } = await deleteProduct(pid); 
    toast({ 
      title: success ? "Success" : "Error", 
      description: message, 
      status: success ? "success" : "error", 
      duration: 3000, 
      isClosable: true, 
    });
  };

  const handleUpdateProduct = async () => { 
    const { success, message } = await updateProduct(product._id, updateProductData); 
    toast({ 
      title: success ? "Success" : "Error", 
      description: message, 
      status: success ? "success" : "error", 
      duration: 3000, 
      isClosable: true, 
    });

    if (success) { 
      onClose(); 
    }
  };

  const handleImageChange = (e) => { 
    const file = e.target.files[0]; // Lấy tệp được chọn
    if (file) {
      const reader = new FileReader(); // Tạo đối tượng FileReader để đọc tệp
      reader.onloadend = () => {
        setImagePreview(reader.result); // Cập nhật hình ảnh tạm thời
        setUpdateProductData({ ...updateProductData, image: reader.result }); // Cập nhật URL hình ảnh
      };
      reader.readAsDataURL(file); // Đọc tệp dưới dạng URL
    }
  };

  return (
    <Box 
      shadow="lg" 
      rounded="lg" 
      overflow="hidden" 
      transform={'all 0.3s'} 
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }} 
      bg={useColorModeValue("white", "gray.800")} 
    >
      <Image src={imagePreview} alt={product.name} h={48} w="full" objectFit="cover" /> {/* Hiển thị hình ảnh tạm thời */}
      <Box p={4}> 
        <Heading as="h3" size="md" mb={2}> 
          {product.name} 
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={useColorModeValue("gray.600", "gray.200")} mb={4}> 
          đ{product.price} 
        </Text>
        <HStack spacing={2}> 
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" /> 
          <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" /> 
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}> 
        <ModalOverlay /> 
        <ModalContent> 
          <ModalHeader>Update Product</ModalHeader> 
          <ModalCloseButton /> 
          <ModalBody> 
            <VStack spacing={4}> 
              <Input 
                placeholder='Product Name' 
                name='name' 
                value={updateProductData.name} 
                onChange={(e) => setUpdateProductData({ ...updateProductData, name: e.target.value })} // Cập nhật tên sản phẩm khi thay đổi
              />
              <Input 
                placeholder='Price' 
                name='price' 
                type="number" 
                value={updateProductData.price} 
                onChange={(e) => setUpdateProductData({ ...updateProductData, price: e.target.value })} // Cập nhật giá sản phẩm khi thay đổi
              />
              <Input 
                placeholder='Image URL' 
                name='image' 
                type='file' // Thay đổi kiểu thành file
                accept='image/*' // Chỉ chấp nhận các tệp hình ảnh
                onChange={handleImageChange} // Gọi hàm khi có thay đổi
              />
            </VStack>
          </ModalBody>
          <ModalFooter> 
            <Button colorScheme="blue" mr={3} onClick={handleUpdateProduct}> 
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard; 
