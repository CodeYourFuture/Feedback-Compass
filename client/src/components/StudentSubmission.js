import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ModuleDropDown from "./ModuleDropDown";

const StudentSubmission = () => {
  const [show, setShow] = useState(false);

  const handleModalOpen = () => {
    return setShow(true);
  };

  const handleModalClose = () => {
    return setShow(false);
  };
  return (
    <div>
      <Button
        style={{ backgroundColor: "black", marginLeft: "19em" }}
        onClick={handleModalOpen}
      >
        Submit You Work Here
      </Button>
      <Modal
        show={show}
        onHide={handleModalClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <ModuleDropDown />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleModalClose}
            style={{ backgroundColor: "#686868" }}
          >
            Sumbit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentSubmission;
