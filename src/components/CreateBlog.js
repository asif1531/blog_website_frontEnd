import { useState } from "react";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
// import { AuthContext } from "../auth";
// import { useContext } from "react";
import axios from "axios";

export default function CreateBlog() {
  //   let userInfo = useContext(AuthContext);

  let [Blog, setBlog] = useState({
    Title: "",
    Content: "",
    Tag: "",
  });

  const [isCreateBlogModalOpen, setisCreateBlogModalOpen] = useState(false);

  function toggleCreateBlogModal() {
    setisCreateBlogModalOpen(!isCreateBlogModalOpen);
  }

  let handleChange = (e) => {
    let { name, value } = e.target;
    setBlog((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  let SubmitBlog = async () => {
    let userId = localStorage.getItem("userId");
    let authToken = localStorage.getItem("authToken");
    console.log("userId,AuthToken", userId, authToken);
    let data = {
      title: Blog.Title,
      content: Blog.Content,
      tag: Blog.Tag,
      createdBy: userId,
    };
    let header = {
      authorization: authToken,
    };

    try {
      let BlogData = await axios.post(
        "http://localhost:5000/api/createBlog",
        data,
        { headers: header }
      );
      console.log(BlogData);
    } catch (err) {
      console.log("Error! Not able to create Blog.", err);
    }
    toggleCreateBlogModal();
  };

  return (
    <>
      <Button color="primary" onClick={toggleCreateBlogModal}>
        CreateBlog
      </Button>

      <Modal isOpen={isCreateBlogModalOpen} toggle={toggleCreateBlogModal}>
        <ModalHeader toggle={toggleCreateBlogModal}>Create Blog</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="examplePassword">Title</Label>
              <Input
                id="Title"
                name="Title"
                placeholder="Enter Title"
                type="text"
                onChange={handleChange}
                value={Blog.Title}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Content</Label>
              <Input
                id="Content"
                name="Content"
                placeholder="Enter Content"
                type="text"
                onChange={handleChange}
                value={Blog.Content}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Tag</Label>
              <Input
                id="Tag"
                name="Tag"
                placeholder="Enter Tag"
                type="text"
                onChange={handleChange}
                value={Blog.Tag}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={SubmitBlog}>
            Submit
          </Button>
          <Button color="secondary" onClick={toggleCreateBlogModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
