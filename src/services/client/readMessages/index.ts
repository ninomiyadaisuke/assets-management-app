import { MessageReadStatus } from "@/app/_components/molecules/NotificationDropMenu";
import { UpdateJaStockInput } from "@/app/_components/templates/JaStockEdit/JaStockEditForm";
import { typedFetch, typedPatch, typedPost } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";
import { JaStockReturn } from "@/services/server/JaStockEdit";

export const readMessagesClient = async (messages: MessageReadStatus[]) => {
  return await typedPatch(`/api/edit/messages`, messages);
};
