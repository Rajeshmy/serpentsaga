import { Button, ChakraProvider, Container, Heading } from "@chakra-ui/react";
import CanvasBoard from "../src/components/CanvasBoard";
import { useSelector } from "react-redux";

function App() {

  const {score} = useSelector((state)=>state.counter);

  return (
    <ChakraProvider>
      <Container maxW="container.lg" centerContent>
        <Heading as="h1" size="xl">
          SNAKE GAME 
        </Heading>
        <Heading as="h3" size="l" color={'red'}>
         SCORE : {score}
        </Heading>
        <CanvasBoard height={600} width={1000} /> 
      </Container>
    </ChakraProvider>
  );
}

export default App;
