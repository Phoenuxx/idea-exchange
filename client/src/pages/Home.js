import React from "react";
import GraphContainer from "../components/GraphContainer";
import Container from '../components/Container'; 
import Row from "../components/Row";
import UserBlock from "../components/UserBlock";


function Home() {
  return (
  <Container>
    <Row>
      <GraphContainer />
      <UserBlock />
    </Row>
  </Container>
  
  );
}

export default Home;
