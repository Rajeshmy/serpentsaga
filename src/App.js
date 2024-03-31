import { Button, ChakraProvider, Container, Heading } from "@chakra-ui/react";
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
    <ChakraProvider >
      <Heading size="l" color={'red'} marginRight={"2%"} marginLeft={"2%"}  marginTop={"8%"}>
         Difficulty Level
         <br></br>
         <select onChange={handlelevelchange}>
          <option value="180">Easy</option>
          <option value="140">Medium</option>
          <option value="90">Hard</option>
         </select>
         
      </Heading>
      <Container maxW="container.lg" centerContent  backgroundColor={"#bddad0"} display="flex" justifyContent="center" alignSelf="center" borderBottomRadius={"20px"}>
        <Heading as="h1" size="xl">
          SNAKE GAME 
        </Heading>
        <Heading size="l" color={'red'} marginBottom={"10px"}>
         SCORE : {score}
        </Heading>
        <CanvasBoard height={600} width={1000} /> 
      </Container>
    </ChakraProvider>
  );
}

export default App;
