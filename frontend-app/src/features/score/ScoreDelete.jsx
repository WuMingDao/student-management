import { toast } from "sonner";
import { deleteScore } from "../../services/apiScore";
import { useAtom, useSetAtom } from "jotai";
import { reloadDeleteScoreAtom } from "../../atoms/reload";
import { useEffect } from "react";

function ScoreDelete({ scoreId }) {
  const [reloadDeleteScore, setReloadDeleteScore] = useAtom(
    reloadDeleteScoreAtom
  );

  useEffect(() => {
    setReloadDeleteScore(false);
  }, [reloadDeleteScore]);

  async function handleDelete() {
    try {
      toast.loading("Deleting score...");
      await deleteScore(scoreId);

      toast.dismiss();
      toast.success("Score deleted successfully!");

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
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        delete
      </button>
      <dialog id="my_modal_1" className="modal">
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
