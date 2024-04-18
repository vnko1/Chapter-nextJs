import { ModalProps } from "@/components/Modal/Modal.type";
import { RefType } from "@/types";

export type UseSwipeProps = {
  leftSwipeCB?: () => void;
  rightSwipeCB?: () => void;
  nodeRef?: RefType;
} & Pick<
  ModalProps,
  "axis" | "touchDistinction" | "enableSwipeOnScreen" | "enableSwipe"
>;
