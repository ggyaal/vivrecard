import { useEffect, useRef, useState } from "react";
import {
  HiBell,
  HiOutlineBell,
  HiBellAlert,
  HiOutlineBellAlert,
  HiBellSlash,
  HiOutlineBellSlash,
} from "react-icons/hi2";
import styled from "styled-components";
import IconButton from "./buttons/IconButton";
import { useSse } from "../hooks/useSse";
import useMember from "../hooks/useMember";
import SideModal from "./SideModal";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import {
  deleteNotification,
  getNotification,
  readNotification,
} from "../api/backend/notification";
import LoadingSpinner from "./LoadingSpinner";
import { NotificationResponse } from "../types/notification";
import NotificationItem from "./NotificationItem";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AlertNumber = styled.div<{ $show: boolean }>`
  position: absolute;
  top: -5px;
  right: 0;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.content.tag.red.border};
  background-color: ${({ theme }) => theme.content.tag.red.background};
  color: ${({ theme }) => theme.content.tag.red.text};
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  z-index: ${({ $show }) => ($show ? 1 : -1)};
`;

const ModalContainer = styled.div`
  max-width: 500px;
  overflow-y: auto;
`;

const ModalError = styled.div`
  background-color: ${({ theme }) => theme.card.error.background};
  border: 1px solid ${({ theme }) => theme.card.error.border};
  color: ${({ theme }) => theme.card.error.text};
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 5px;
`;

const NotificationList = styled.div`
  min-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0;
`;

const Alert = () => {
  const [notifications, setNotifications] = useState<
    NotificationResponse[] | null
  >(null);
  const [newCount, setNewCount] = useState<number>(0);
  const [idx, setIdx] = useState<number | null>(null);
  const [readed, setReaded] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data: member } = useMember();
  const { status } = useSse({
    enabled: !!member,
    onMessage: (e) => console.log("기본 메시지:", e.data),
    on: {
      "notification.created": (e) => {
        refetch();
      },
    },
  });
  const {
    data: infiniteNotifications,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["member", member?.id, "notifications"],
    initialPageParam: 0,
    queryFn: ({ pageParam, signal }: QueryFunctionContext) =>
      getNotification({
        page: pageParam as number,
        signal,
      }),
    getNextPageParam: (currPage) => {
      if (currPage.last) return undefined;

      return currPage.page + 1;
    },
    enabled: !!member,
    retry: false,
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) setIdx(null);
  }, [open]);

  useEffect(() => {
    if (idx !== null || readed === null || !notifications) return;

    const notiSort = (a: NotificationResponse, b: NotificationResponse) => {
      const aTime = new Date(a.createdAt);
      const bTime = new Date(b.createdAt);

      if (isNaN(aTime.getTime())) return 1;
      if (isNaN(bTime.getTime())) return -1;

      return bTime.getTime() - aTime.getTime();
    };

    const updatedNotications = [...notifications];
    const noti = updatedNotications.splice(readed, 1);
    if (noti.length > 0) {
      setNotifications([
        ...updatedNotications.filter((n) => n.readAt === null),
        ...[
          noti[0],
          ...updatedNotications.filter((n) => n.readAt !== null),
        ].sort(notiSort),
      ]);
    }
    setReaded(null);
  }, [idx, readed, notifications]);

  useEffect(() => {
    if (!isLoading && infiniteNotifications) {
      const currNotications = infiniteNotifications.pages.flatMap(
        (page) => page.content
      );
      setNotifications(currNotications);

      setNewCount(
        currNotications.reduce(
          (acc, curr) => acc + (curr.readAt === null ? 1 : 0),
          0
        )
      );
    }
  }, [isLoading, infiniteNotifications]);

  useEffect(() => {
    if (!open || !loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [open, fetchNextPage, hasNextPage]);

  const icon = newCount
    ? HiOutlineBellAlert
    : status !== "open"
    ? HiOutlineBellSlash
    : HiOutlineBell;
  const hoverIcon = newCount
    ? HiBellAlert
    : status !== "open"
    ? HiBellSlash
    : HiBell;

  return (
    <>
      <Container>
        <IconButton
          icon={icon}
          hoverIcon={hoverIcon}
          size={32}
          onClick={() => {
            if (!member) {
              navigate("/login");
              return;
            }
            setOpen(!open);
          }}
        />
        <AlertNumber $show={newCount > 0} onClick={() => setOpen(!open)}>
          {newCount > 9 ? "9+" : newCount}
        </AlertNumber>
      </Container>
      <SideModal open={open} onClose={() => setOpen(false)}>
        <ModalContainer>
          {status !== "open" && (
            <ModalError>서버에서 알림을 바로 줄 수 없어요:(</ModalError>
          )}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <NotificationList>
              {notifications && notifications.length > 0 ? (
                notifications.map((noti, i) => (
                  <NotificationItem
                    key={`noti_${noti.id}`}
                    notification={noti}
                    isOpen={idx === i}
                    isRead={noti.readAt !== null}
                    onClick={async () => {
                      if (idx !== i) {
                        setIdx(i);
                      }

                      if (noti.readAt === null) {
                        const data = await readNotification(noti.id);

                        if (data) {
                          setNotifications(
                            notifications.map((n) => {
                              if (n.id === noti.id) {
                                n.readAt = new Date().toISOString();
                              }
                              return n;
                            })
                          );
                          setNewCount(newCount - 1);
                          setReaded(i);
                        }
                      }
                    }}
                    onClose={() => setIdx(null)}
                    deleteItem={async () => {
                      const isDeleted = await deleteNotification(noti.id);

                      if (isDeleted) {
                        setNotifications(
                          notifications.filter((n) => n.id !== noti.id)
                        );
                      }
                    }}
                  />
                ))
              ) : (
                <div>알림이 없습니다.</div>
              )}
              <div ref={loadMoreRef} style={{ height: 1 }} />
            </NotificationList>
          )}
        </ModalContainer>
      </SideModal>
    </>
  );
};

export default Alert;
