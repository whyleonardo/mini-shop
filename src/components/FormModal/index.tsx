import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  InputGroup,
  Input,
  VStack,
  InputLeftElement,
  Text
} from '@chakra-ui/react'
import { useState } from 'react'

import { FaPhoneAlt, FaRegKeyboard, FaEnvelope } from 'react-icons/fa'

import { number, string, object } from 'yup'

const validationSchema = object({
  name: string().required(),
  email: string().required().email(),
  tel: number()
})

export const FormModal = () => {

  const [inputValues, setInputValues] = useState({
    name: '',
    tel: '',
    email: ''
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleChangeInputValues = (e: any) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Button onClick={onOpen}>Continuar</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              display='flex'
            >
              <Text alignSelf='start'>Preencha seus dados</Text>

              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<FaRegKeyboard color='gray.300' />}
                />
                <Input
                  placeholder='Nome'
                  type='text'
                  onChange={handleChangeInputValues}
                />
              </InputGroup>


              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<FaPhoneAlt color='gray.300' />}
                />
                <Input
                  placeholder='Telefone'
                  type='tel'
                  name='tel'
                  onChange={handleChangeInputValues}
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<FaEnvelope color='gray.300' />}
                />
                <Input
                  placeholder='Email'
                  type='email'
                  name='name'
                  onChange={handleChangeInputValues}
                />
              </InputGroup>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}