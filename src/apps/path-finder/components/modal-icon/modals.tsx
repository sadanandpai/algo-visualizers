import { useRef } from 'react';
import { Info, X } from 'lucide-react';
import classes from './modals.module.scss';
import { createPortal } from 'react-dom';
interface Props {
  content: { id: number; heading: string; content: string }[];
}

const Modals = ({ content }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleShowModal = () => {
    dialogRef.current?.showModal();
  };

  const handleCloseModal = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <button onClick={handleShowModal} className={classes.infoButton}>
        <Info size={20} />
      </button>
      {createPortal(
        <dialog ref={dialogRef} className={classes.dialog}>
          <button onClick={handleCloseModal} className={classes.closeButton}>
            <X />
          </button>

          <div className={classes.body}>
            {content.map((item) => (
              <div key={item.id} className={classes.content}>
                <h1 className={classes.contentHeading}>{item.heading}</h1>
                <p className={classes.contentPara}>{item.content}</p>
              </div>
            ))}
          </div>
        </dialog>,
        document.getElementById('modal')!
      )}
    </>
  );
};

export default Modals;
