import { ReactNode } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'

interface ReactModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    showCloseIcon?: boolean;
    width?: string;
}

export const ReactModal = (props: ReactModalProps) => {
    const { 
        isOpen, 
        onClose, 
        children, 
        showCloseIcon,
        width = 500
    } = props

    const modalStyles = {
        modal: {
            fontFamily: 'Inter',
            borderRadius: '10px',
            width
        },
    };

    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
                center
                showCloseIcon={showCloseIcon}
                styles={modalStyles}
            >
                {children}
            </Modal>
        </>
    );
};