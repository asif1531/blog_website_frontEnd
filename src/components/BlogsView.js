import axios from "axios";
import React, { Component } from "react";

import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import CreateBlog from "./CreateBlog";

export class BlogsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInterests: "",
      blogsData: "",
      // isCreateBlogModalOpen: false,
    };
  }

  toggleCreateBlogModal = () => {
    this.setState({
      isCreateBlogModalOpen: !this.state.isCreateBlogModalOpen,
    });
  };

  componentDidMount = async () => {
    const authToken = localStorage.getItem("authToken");
    const interests = localStorage.getItem("interests");
    const userId = localStorage.getItem("userId");
    const interestsArray = interests.split(",");
    this.setState({
      userInterests: interestsArray,
    });
    console.log("Interests............", interestsArray);
    const headers = {
      authorization: authToken,
    };
    const data = {
      interests: interestsArray,
    };
    try {
      const blogApiReponse = await axios.post(
        "http://localhost:5000/api/getBlogsByInterests",
        data,
        {
          headers: headers,
        }
      );
      console.log("blog api response....", blogApiReponse);
      this.setState({
        blogsData: blogApiReponse.data,
      });
    } catch (err) {
      console.log("errrrr..........", err);
    }
  };

  displayBlogs() {
    if (!this.state.blogsData || this.state.blogsData.length == 0) {
      return <h4>No blogs found..!!</h4>;
    } else {
      return this.state.blogsData.map((blog) => {
        return (
          <Card>
            <CardBody>
              <CardTitle tag="h5">{blog.title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {blog.tag}
              </CardSubtitle>
              <CardText>{blog.content}</CardText>
            </CardBody>
          </Card>
        );
      });
    }
  }

  createBlog = () => {};

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3 my-3">
            <h4>Interests of the user</h4>
          </div>

          <div className="col-6">{this.displayBlogs()}</div>
          <div className="col-3 my-4">
            {/* <button onClick={this.toggleCreateBlogModal}>Create Blog</button> */}
            <CreateBlog />
          </div>
        </div>
        {/* <Modal
          isOpen={this.state.isCreateBlogModalOpen}
          toggle={this.toggleCreateBlogModal}
        >
          <ModalHeader toggle={this.toggleCreateBlogModal}>
            Modal title
          </ModalHeader>
          <ModalBody>Demo</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleCreateBlogModal}>
              CreteBlog3
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleCreateBlogModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal> */}
        ;
      </div>
    );
  }
}

export default BlogsView;
