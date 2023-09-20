import { typedFetch } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";
import { NotificationReturn } from "@/services/server/notificationFetch";

export const fetchNotificationClient = async (uid: string) => {
  const params = { q: uid };
  const query = new URLSearchParams(params);

  return typedFetch<NotificationReturn>(`${url}/api/notification?${query}`, {});
};
