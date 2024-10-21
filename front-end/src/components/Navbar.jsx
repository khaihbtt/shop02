import {  Button, Container, Flex, HStack, Text, useColorMode} from '@chakra-ui/react'
import { PlusSquareIcon} from '@chakra-ui/icons'
import { IoMoon } from "react-icons/io5"
import {LuSun } from "react-icons/lu"
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <Container maxW={"1140px"} px={4} >
        <Flex h={16} 
        alignItems={"Center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "center",
          sm: "row",
        }}
        >
          <Text 
            fontSize={{base:"22", sm:"28" }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={'center'}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
          >
            <NavLink to={"/"} > Product Store </NavLink>

          </Text>
          <HStack spacing={2} alignItems={'center'} >
              <NavLink to={"/create"} >
              <Button>
                <PlusSquareIcon fontSize={22} />
              </Button>
              </NavLink>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ?<IoMoon /> : <LuSun Sỉze="20" />}

              </Button>
              


          </HStack>

          

        </Flex>
    </Container>
  )
}

export default Navbar