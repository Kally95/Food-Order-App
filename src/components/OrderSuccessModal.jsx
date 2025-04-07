export default function OrderSuccessModal({ closeSuccessModal, ref }) {
  return (
    <dialog ref={ref} className="cart modal">
      <h3>Success!</h3>
      <p>Your order was submitted successfully.</p>
      <p>
        We will get back to you with more details via email within the next few
        minutes.
      </p>
      <div className="modal-actions">
        <button className="button" onClick={closeSuccessModal}>
          Okay
        </button>
      </div>
    </dialog>
  );
}
