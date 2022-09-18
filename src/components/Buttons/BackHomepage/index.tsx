import { chakra, shouldForwardProp, useBoolean } from "@chakra-ui/react"
import { isValidMotionProp, motion } from "framer-motion"
import { FaHome, FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"


const BoxChakra = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})


const ButtonChakra = chakra(motion.button, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

export const BackHomepage = () => {
  const [flag, setFlag] = useBoolean()

  const navigate = useNavigate()

  const handleBackHomepage = () => {
    navigate('/')
  }


  return (
    <ButtonChakra
      display='flex'
      onMouseEnter={setFlag.on}
      onMouseLeave={setFlag.off}
      onClick={handleBackHomepage}
    >
      {
        !flag
          ?
          < BoxChakra whileHover={{ scale: 0.9 }}>
            <FaHome size='1.5rem' />
          </BoxChakra>

          : <BoxChakra whileHover={{ scale: 0.9 }} >
            <FaArrowLeft size='1.5rem' />
          </BoxChakra>
      }


    </ButtonChakra >
  )
}
