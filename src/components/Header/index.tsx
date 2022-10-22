import { Box, Flex, useColorModeValue, useDisclosure, HStack, IconButton, chakra, VStack, Button, VisuallyHidden, Avatar } from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"
import { BackHomepage } from "../Buttons/BackHomepage"
import { CartIcon } from "../Buttons/CartIcon"
import { FavoriteIcon } from "../Buttons/FavoriteIcon"


import { SearchMovieInput } from "../SearchMovieInput"

export const Header = () => {
  const { pathname } = useLocation()

  const bg = useColorModeValue("white", "gray.800")
  const mobileNav = useDisclosure()

  //   return (
  //     <Flex
  //       bg='brand.100'
  //       boxShadow='xs'
  //       h='3.5rem'
  //       w='100vw'
  //       as='header'
  //       px='2rem'
  //       py='1.5rem'
  //       alignItems='center'
  //       justifyContent='space-between'
  //       position='sticky'
  //       zIndex='20'
  //       top='0'
  //     >
  //       {pathname !== '/'

  //         ? <BackHomepage />
  //         : <Link to='/' >Oi</Link>
  //       }
  //       < Flex
  //         alignSelf='center'
  //         gap='0.5rem'
  //       >
  //         <SearchMovieInput />
  //         <CartIcon />
  //         <FavoriteIcon />
  //       </Flex >
  //     </Flex >
  //   )
  // }


  return (
    <Box shadow="md">
      <chakra.header
        bg={bg}
        borderColor="gray.600"
        borderBottomWidth={1}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack spacing={4} display="flex" alignItems="center">
            <Box
              display={{
                base: "inline-flex",
                md: "none",
              }}
            >
              <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: "inherit",
                }}
                variant="ghost"
                icon={<FavoriteIcon />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                <Button w="full" variant="ghost" leftIcon={<FavoriteIcon />}>
                  Dashboard
                </Button>
                <Button
                  w="full"
                  variant="solid"
                  colorScheme="brand"
                  leftIcon={<FavoriteIcon />}
                >
                  Inbox
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  leftIcon={<FavoriteIcon />}
                >
                  Videos
                </Button>
              </VStack>
            </Box>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              {/* <Logo /> */}
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl">Settings</chakra.h1>
          </HStack>
          <HStack spacing={3} display="flex" alignItems="center">
            <HStack
              spacing={3}
              display={{
                base: "none",
                md: "inline-flex",
              }}
            >
              <Button variant="ghost" leftIcon={<FavoriteIcon />} size="sm">
                Dashboard
              </Button>
              <Button
                variant="solid"
                colorScheme="brand"
                leftIcon={<FavoriteIcon />}
                size="sm"
              >
                Inbox
              </Button>
              <Button
                variant="ghost"
                leftIcon={<FavoriteIcon />}
                size="sm"
              >
                Videos
              </Button>
            </HStack>
            <chakra.a
              p={3}
              color="gray.800"
              _dark={{
                color: "inherit",
              }}
              rounded="sm"
              _hover={{
                color: "gray.800",
                _dark: {
                  color: "gray.600",
                },
              }}
            >
              <FavoriteIcon />
              <VisuallyHidden>Notifications</VisuallyHidden>
            </chakra.a>

            <Avatar
              size="sm"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
          </HStack>
        </Flex>
      </chakra.header>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mx={2}
        borderWidth={0}
        overflowX="auto"
      >
        <Tabs defaultIndex={1} borderBottomColor="transparent">
          <TabList>
            <Tab
              py={4}
              m={0}
              _focus={{
                boxShadow: "none",
              }}
            >
              Basic
            </Tab>
            <Tab
              py={4}
              m={0}
              _focus={{
                boxShadow: "none",
              }}
            >
              Integrations
            </Tab>
            <Tab
              py={4}
              m={0}
              _focus={{
                boxShadow: "none",
              }}
            >
              Notifications
            </Tab>
            <Tab
              py={4}
              m={0}
              _focus={{
                boxShadow: "none",
              }}
            >
              Usage
            </Tab>
            <Tab
              py={4}
              m={0}
              _focus={{
                boxShadow: "none",
              }}
            >
              Billing
            </Tab>{" "}
            <Tab isDisabled py={4} m={0}>
              Advanced
            </Tab>
          </TabList>
        </Tabs>
        <Spacer />
        <HStack spacing={3} alignItems="center">
          <InputGroup
            display={{
              base: "none",
              lg: "block",
            }}
            ml="auto"
          >
            <InputLeftElement pointerEvents="none">
              <AiOutlineSearch />
            </InputLeftElement>
            <Input type="tel" placeholder="Search..." />
          </InputGroup>
        </HStack>
      </Flex>
    </Box>
  )
}


