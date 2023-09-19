import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PostList from "./Home/Content";
import LeftSideBar from "./Home/LeftSideBar";
import AuthContext from "../contexts/AuthContext/AuthContext";



function Home() {
  const {postData} = useContext(AuthContext);

  
  return (
    <Container fluid>
      <Row>
        {/* Cột trái (sidebar) */}
        <Col md={3}>
          <LeftSideBar />
        </Col>

        {/* Cột chính (nội dung chính) */}
        <Col md={6}>
          <PostList posts={postData} />
        </Col>

        {/* Cột phải (quảng cáo, bạn bè, vv) */}
        <Col md={3}>
          <div><b>Trò chuyện</b></div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
