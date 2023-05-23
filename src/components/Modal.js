import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@windmill/react-ui';

const ModalComponent = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
    if (!props.error) {
      window.location.replace(`/app/${props.location}`);
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader
          className={!props.error ? 'text-green-700' : 'text-red-700'}
        >
          {!props.error ? <>Success</> : <>Error</>}
        </ModalHeader>
        <ModalBody>{props.message}</ModalBody>
        <ModalFooter>
          <Button className='sm:w-auto' onClick={closeModal}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalComponent;
