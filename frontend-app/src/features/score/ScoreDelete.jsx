import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { deleteScore } from "../../services/apiScore";
import { useSetAtom } from "jotai";
import { reloadDeleteScoreAtom } from "../../atoms/reload";

function ScoreDelete({ scoreId }) {
  const setReloadDeleteScore = useSetAtom(reloadDeleteScoreAtom);

  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const toastId = toast.loading("Deleting score...");
      await deleteScore(scoreId);

      toast.dismiss(toastId);
      toast.success("Score deleted successfully!");

      navigate("/home/score");
      setReloadDeleteScore(true);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-soft btn-error"
        onClick={() =>
          document.getElementById(`delete_modal_${scoreId}`).showModal()
        }
      >
        delete
      </button>
      <dialog id={`delete_modal_${scoreId}`} className="modal">
        <div className="modal-box">
          <p className="py-4 text-center text-red-600">
            Press again confirm to delete the score.
          </p>
          <div className="modal-action flex justify-center items-center gap-8">
            <button className="btn btn-soft btn-error" onClick={handleDelete}>
              Confirm
            </button>

            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-soft btn-info">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
export default ScoreDelete;
