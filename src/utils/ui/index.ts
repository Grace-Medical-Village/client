import { notification } from 'antd';
import { IconType, NotificationPlacement } from 'antd/lib/notification';

export const notificationHandler = (
  status: number,
  description: string,
  placement: NotificationPlacement
) => {
  const type: IconType = status <= 299 && status >= 200 ? 'success' : 'error';
  const message = status <= 299 && status >= 200 ? 'Success' : 'Error';
  openNotificationWithIcon(message, description, type, placement);
};

const openNotificationWithIcon = (
  message: string,
  description: string,
  type: IconType,
  placement: NotificationPlacement
): void => {
  notification[type]({
    message,
    description,
    placement,
  });
};
