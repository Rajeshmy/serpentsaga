import { Box, Button, ChakraProvider, Container, Heading } from "@chakra-ui/react";
import CanvasBoard from "../src/components/CanvasBoard";
import { useSelector } from "react-redux";
import { setdifficulty } from "./utilities/difficulty";

function App() {

  const {score} = useSelector((state)=>state.counter);

  const handlelevelchange = (e)=>{
    let val = Number(e.target.value);
    setdifficulty(val);
  }

  return (
    <ChakraProvider>
      <Box bg="teal.100"
        width="100%"
        height="100%"
        py="4">
      
      <Container maxW="container.lg" centerContent  backgroundColor={"#bddad0"} display="flex" justifyContent="center" alignSelf="center" borderRadius={"20px"} >
      <div style={{display:"flex",flexDirection:'row', justifyContent:'space-evenly',backgroundColor:'rgba(0,0,0,0.1)', width:"100%",alignItems:'center',height:"120px",borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}>
      <Heading size="l" color={'red'} >
         Difficulty Level
         <select onChange={handlelevelchange}>
          <option value="180">Easy</option>
          <option value="140">Medium</option>
          <option value="90">Hard</option>
         </select>
      </Heading>
        <Heading as="h1" size="xl">
          SNAKE GAME 
        </Heading>
        <Heading size="l" color={'red'} marginBottom={"10px"}>
         SCORE : {score}
        </Heading>
        </div>
        <CanvasBoard height={600} width={1000} /> 
      </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
