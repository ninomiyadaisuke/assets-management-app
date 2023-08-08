import { TrashIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

import { Button } from "../../atoms/Button";
import { AlertDialog } from "../AlertDialog";

type Props = {
  isSubmitting: boolean;
  holdingId: string;
  index: number;
  handleDelete: (holdingId: string, index: number) => void;
  handleDeleteDb: (holdingId: string) => void;
};

export const DeleteConfirmationButton: FC<Props> = (props) => {
  const { isSubmitting, handleDelete, handleDeleteDb, index, holdingId } =
    props;

  const handleClick = () => {
    handleDelete(holdingId, index);
  };

  const handleAlertDialogClick = () => {
    handleDeleteDb(holdingId);
  };
  return (
    <>
      <TrashIcon
        type="button"
        onClick={handleClick}
        className="h-[24px] w-[24px] cursor-pointer"
      />
      <AlertDialog
        buttonComponent={(label) => (
          <Button
            disabled={isSubmitting}
            type="button"
            theme="error"
            onClick={handleAlertDialogClick}
          >
            {label}
          </Button>
        )}
      />
    </>
  );
};
