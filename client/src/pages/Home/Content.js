import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Form,
  InputGroup,
  Modal,
  Container,
} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComments,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import postAPI from "../../sevices/postAPI";

function PostList({ posts }) {
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const initialPostCount = 10;
  const { auth, getAllPost } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const user = auth.user;
  useEffect(() => {
    if (posts.length > 0) {
      setDisplayedPosts(posts.slice(0, initialPostCount));
    }
  }, [posts]);

  const fetchMoreData = () => {
    const currentDisplayCount = displayedPosts.length;
    const nextDisplayCount = currentDisplayCount + initialPostCount;
    if (nextDisplayCount >= posts.length) {
      setHasMore(false);
    }
    setDisplayedPosts(posts.slice(0, nextDisplayCount));
  };

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
        getAllPost();
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
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={displayedPosts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Container className="d-flex justify-content-center">
          <h3>
            <i>Bảng tin</i>
          </h3>
        </Container>
        {displayedPosts.map((post) => (
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
                  <FontAwesomeIcon
                    style={{ margin: "0 12px" }}
                    icon={faComments}
                  />
                  Số bình luận: {post.comments.length}
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
                    <Button
                      type="button"
                      onClick={() => handleSubmit(post._id)}
                    >
                      <FontAwesomeIcon
                        style={{ padding: "0px 12px" }}
                        icon={faComment}
                      />
                    </Button>
                  </InputGroup>
                </Form>
                <Link
                  to={`/detail-post/${post._id}`}
                  className="btn btn-primary"
                >
                  Xem chi tiết
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default PostList;
