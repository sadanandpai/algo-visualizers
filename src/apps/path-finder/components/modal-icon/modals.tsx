import { useCallback, useRef } from 'react';
import classes from './modals.module.scss';
import { Info, X } from 'lucide-react';

interface ModalItem {
  id: number;
  heading: string;
  content: string;
}
const Modals = ({ content }: { content: ModalItem[] }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleShowModal = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);
  const handleCloseModal = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, []);
  return (
    <div className={classes.mainModal}>
      <dialog ref={dialogRef} className={classes.dialog}>
        <button onClick={handleCloseModal} className={classes.closeButton}>
          <X />
        </button>
        {content.map((item: ModalItem) => (
          <div key={item.id} className={classes.contentDiv}>
            <h1 className={classes.contentHeading}>{item.heading}</h1>
            <p className={classes.contentPara}>{item.content}</p>
          </div>
        ))}
      </dialog>
      <button onClick={handleShowModal} className={classes.infoButton}>
        <Info />
      </button>
    </div>
  );
};

export default Modals;
