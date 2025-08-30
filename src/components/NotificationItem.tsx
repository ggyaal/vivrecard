import styled, { css } from "styled-components";
import { NotificationResponse } from "../types/notification";
import { notificationTypeIcon } from "../types/notificationType";
import { getExp, getRelatedImage } from "../utils/relatedUtils";
import IconButton from "./buttons/IconButton";
import { formatRelativeTime } from "../utils/timeUtils";
import { PiTrash, PiTrashFill } from "react-icons/pi";

interface NotificationItemProps {
  notification: NotificationResponse;
  isOpen: boolean;
  isRead: boolean;
  onClose?: () => void;
  onClick?: () => void;
  deleteItem?: () => void;
  disabled?: boolean;
}

const Container = styled.div<{ $read: boolean; $open: boolean }>`
  padding: 20px 10px;
  width: 100%;
  display: flex;
  gap: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.card.basic.background};
  color: ${({ theme }) => theme.card.basic.text};
  transition: opacity 0.3s ease;
  opacity: ${({ $read, $open }) => ($read && !$open ? 0.5 : 1)};

  ${({ $open }) => {
    if (!$open)
      return css`
        cursor: pointer;

        &:hover {
          background-color: ${({ theme }) => theme.card.info.background};
        }
      `;
  }}
`;

const ItemIconWrapper = styled.div`
  min-width: 45px;
  width: 45px;
  height: 45px;
  border: 1px solid ${({ theme }) => theme.card.basic.border};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.card.basic.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemWrapper = styled.div`
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemTitle = styled.h4<{ $open: boolean }>`
  font-size: 18px;
  font-weight: 600;

  ${({ $open }) => {
    if ($open) {
      return css`
        white-space: break-spaces;
        cursor: pointer;
      `;
    }
    return css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;
  }}
`;

const ItemMessage = styled.div<{ $open: boolean }>`
  ${({ $open }) => {
    if ($open) {
      return css`
        white-space: break-spaces;
      `;
    }
    return css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;
  }}
`;

const ItemPalette = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ItemInfo = styled.div`
  flex: 1;
  padding-bottom: 15px;
  overflow-x: auto;
  display: flex;
  align-items: center;
`;

const ItemInfoList = styled.div`
  width: fit-content;
  min-height: 55px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ItemToolbar = styled.div`
  padding: 5px;
`;

const ItemExpBlock = styled.div`
  min-width: fit-content;
  border: 1px solid ${({ theme }) => theme.card.info.border};
  background-color: ${({ theme }) => theme.card.info.background};
  color: ${({ theme }) => theme.card.info.text};
  font-size: 16px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 10px;
`;

const ItemRelatedIconWrapper = styled.div`
  width: 55px;
  height: 55px;
`;

const ItemFooter = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.card.basic.paleText};
`;

const NotificationItem = ({
  notification,
  isOpen,
  isRead,
  onClick,
  onClose,
  deleteItem,
  disabled = false,
}: NotificationItemProps) => {
  const Icon = notificationTypeIcon[notification.type];
  const exp = getExp(notification.publisher);
  const iconImage = notification.publisher
    ? getRelatedImage(notification.publisher)
    : null;

  return (
    <Container
      $open={isOpen}
      $read={isRead}
      onClick={async () => {
        if (!disabled && onClick) {
          onClick();
        }
      }}
    >
      <ItemIconWrapper>
        {iconImage ? <ItemIcon src={iconImage} /> : <Icon size={35} />}
      </ItemIconWrapper>
      <ItemWrapper>
        <ItemTitle
          $open={isOpen}
          onClick={() => {
            if (isOpen && onClose) {
              onClose();
            }
          }}
        >
          {notification.title}
        </ItemTitle>
        <ItemMessage $open={isOpen}>{notification.message}</ItemMessage>
        {isOpen && (
          <ItemPalette>
            <ItemInfo>
              <ItemInfoList>
                {exp && <ItemExpBlock>{`EXP +${exp}`}</ItemExpBlock>}
                {notification.related &&
                  notification.related.map((rel, idx) => {
                    const url = getRelatedImage(rel.related);

                    return (
                      <ItemRelatedIconWrapper key={`related_${idx}`}>
                        {url ? <ItemIcon src={url} /> : <Icon size={25} />}
                      </ItemRelatedIconWrapper>
                    );
                  })}
              </ItemInfoList>
            </ItemInfo>
            <ItemToolbar>
              <IconButton
                icon={PiTrash}
                hoverIcon={PiTrashFill}
                size={25}
                onClick={deleteItem}
              />
            </ItemToolbar>
          </ItemPalette>
        )}
        <ItemFooter>
          {formatRelativeTime(new Date(notification.createdAt))}
        </ItemFooter>
      </ItemWrapper>
    </Container>
  );
};

export default NotificationItem;
