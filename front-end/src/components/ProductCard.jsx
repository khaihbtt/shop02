import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react"; // Nhập các thành phần từ Chakra UI để sử dụng trong giao diện
import { EditIcon, DeleteIcon } from "@chakra-ui/icons"; // Nhập biểu tượng Edit và Delete
import { useProductStore } from "../store/product"; // Nhập store quản lý sản phẩm
import { useState } from "react"; // Nhập hook useState để quản lý trạng thái

const ProductCard = ({ product }) => { // Định nghĩa thành phần ProductCard với thuộc tính product
  if (!product) return null; // Nếu không có sản phẩm, trả về null

  // Lấy các hàm từ store
  const { updateProduct, deleteProduct } = useProductStore(); // Lấy hàm updateProduct và deleteProduct từ store
  const toast = useToast(); // Tạo thông báo toast
  const { isOpen, onOpen, onClose } = useDisclosure(); // Quản lý trạng thái mở/đóng modal

  // Trạng thái sản phẩm để cập nhật
  const [updateProductData, setUpdateProductData] = useState({ ...product }); // Khởi tạo trạng thái với dữ liệu sản phẩm hiện tại

  // Hàm xử lý xóa sản phẩm
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid); // Gọi hàm xóa sản phẩm từ store
    toast({ // Hiển thị thông báo cho người dùng
      title: success ? "Success" : "Error", // Tiêu đề thông báo
      description: message, // Mô tả thông báo
      status: success ? "success" : "error", // Trạng thái thông báo
      duration: 3000, // Thời gian hiển thị thông báo
      isClosable: true, // Cho phép người dùng đóng thông báo
    });
  };

  // Hàm xử lý cập nhật sản phẩm
  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(product._id, updateProductData); // Gọi hàm cập nhật sản phẩm từ store
    toast({ // Hiển thị thông báo cho người dùng
      title: success ? "Success" : "Error", // Tiêu đề thông báo
      description: message, // Mô tả thông báo
      status: success ? "success" : "error", // Trạng thái thông báo
      duration: 3000, // Thời gian hiển thị thông báo
      isClosable: true, // Cho phép người dùng đóng thông báo
    });

    if (success) {
      onClose(); // Đóng modal nếu cập nhật thành công
    }
  };

  return (
    <Box // Thẻ Box chứa sản phẩm
      shadow="lg" // Đổ bóng cho Box
      rounded="lg" // Bo tròn góc cho Box
      overflow="hidden" // Ẩn nội dung tràn ra ngoài
      transform={'all 0.3s'} // Hiệu ứng chuyển đổi
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }} // Hiệu ứng khi hover
      bg={useColorModeValue("white", "gray.800")} // Màu nền thay đổi theo chế độ sáng/tối
    >
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" /> 
      <Box p={4}> 
        <Heading as="h3" size="md" mb={2}> 
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={useColorModeValue("gray.600", "gray.200")} mb={4}> 
          {product.price} đ
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
                placeholder='Product Name' // Placeholder cho trường tên sản phẩm
                name='name' 
                value={updateProductData.name} // Giá trị của trường tên
                onChange={(e) => setUpdateProductData({ ...updateProductData, name: e.target.value })} // Cập nhật tên sản phẩm khi thay đổi
              />
              <Input 
                placeholder='Price' // Placeholder cho trường giá sản phẩm
                name='price' 
                type="number" 
                value={updateProductData.price} // Giá trị của trường giá
                onChange={(e) => setUpdateProductData({ ...updateProductData, price: e.target.value })} // Cập nhật giá sản phẩm khi thay đổi
              />
              <Input 
                placeholder='Image URL' // Placeholder cho trường URL hình ảnh
                name='image' 
                value={updateProductData.image} // Giá trị của trường URL hình ảnh
                onChange={(e) => setUpdateProductData({ ...updateProductData, image: e.target.value })} // Cập nhật URL hình ảnh khi thay đổi
              />
            </VStack>
          </ModalBody>
          <ModalFooter> // Chân modal
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

export default ProductCard; // Xuất thành phần ProductCard
