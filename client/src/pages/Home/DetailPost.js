import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postAPI from "../../sevices/postAPI";

import { Link } from "react-router-dom";
import { Card, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComments,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import Loader from "../../sevices/loader";

function DetailPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { auth } = useContext(AuthContext);
  const user = auth.user;

  const fetchData = async () => {
    try {
      const response = await postAPI.detailPost(postId);
      const postData = response.data.data;
      setPost(postData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLikeButtonClick = async (postId) => {
    if (!auth.isAuthenticated) {
      openModal();
    } else {
      try {
        await postAPI.toggleLike(postId);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Handle add-comment
  const handleSubmit = async (postId) => {
    try {
      if (!auth.isAuthenticated) {
        openModal();
      }

      const commentData = {
        by: user.fullname,
        text: newComment,
      };

      console.log(postId, commentData);
      console.log(user);

      await postAPI.addComment(postId, commentData);
      fetchData();
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  if (!post) {
    // Hiển thị thông báo hoặc spinner trong quá trình tải dữ liệu
    return <Loader />;
  }

  return (
    <div>
      <h4>{post.owner}</h4>
      <Card key={post.id} style={{ marginBottom: "20px" }}>
        <Card.Img
          variant="top"
          src={post.imageUrl}
          alt={post.status}
          style={{ width: "100%", height: "300px" }}
        />
        <Card.Body>
          <Card.Title>{post.status}</Card.Title>
          <Card.Text>
            <Button
              onClick={() => handleLikeButtonClick(post._id)}
              style={{ border: "1px" }}
              variant="outline-primary"
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </Button>
            <Modal show={showModal} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Bạn cần phải đăng nhập để thực hiện hành động này
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Đóng
                </Button>
              </Modal.Footer>
            </Modal>
            Số lượt thích: {post.likes.length}
            <br />
            <FontAwesomeIcon style={{margin: "0 12px"}} icon={faComments} />
            Số bình luận: {post.comments.length}
            {post.comments.map((comment, index) => (
              <div key={index}>
                <p>
                  <b>{comment.by}</b>: {comment.content}
                </p>
              </div>
            ))}
          </Card.Text>
          <Form onSubmit={(e) => e.preventDefault()}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Bình Luận:
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={newComment}
                onChange={handleChange}
              />
              <Button type="button" onClick={() => handleSubmit(post._id)}>
                <FontAwesomeIcon
                  style={{ padding: "0px 12px" }}
                  icon={faComment}
                />
              </Button>
            </InputGroup>
          </Form>
          <Link to="/" className="btn btn-primary">
            Về trang chủ
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DetailPost;
