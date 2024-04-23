import { useModalStore } from '../store/modalStore.ts';
import { useBalanceStore } from '../store/store';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import endScreen from '../assets/openart-image_k_z322m2_1713914641360_raw.png'

const ModalComponent = () => {
  const { isOpen, toggleModal } = useModalStore();
  const reset = useBalanceStore((state) => state.reset);

  const resetGame = () => {
    toggleModal();
    reset();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={toggleModal}>
      <h2>Come back soon!</h2>
      <div>
        <div>
          <img src={endScreen} height={"400"} width={"auto"}/>
        </div>
        <Link to="/">
          <button onClick={resetGame}>Play Again</button>
        </Link>
      </div>
    </Modal>
  );
};

export default ModalComponent;