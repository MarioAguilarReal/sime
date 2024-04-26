import { Modal } from 'react-bootstrap';
import './DeleteModal.scss';

import React from 'react';

interface DeleteModalProps {
    obj : string;
    show : boolean;
    onClose : () => void;
    onDelete : () => void;
}

const DeleteModal = (props : DeleteModalProps) => {
    const {obj, show, onClose, onDelete} = props;

    return (
        <div>
          <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>Eliminar {obj}</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Está seguro que desea eliminar este {obj}?</Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={onDelete}>
                Eliminar
              </button>
            </Modal.Footer>
          </Modal>
        </div>
    )
}

export default DeleteModal;
