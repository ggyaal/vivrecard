import { useEffect, useRef, useState } from "react";
import requestAutoRefresh from "../utils/requestAutoRefresh";

interface UseSseOptions {
  enabled?: boolean;
  baseUrl?: string;
  onMessage?: (e: MessageEvent) => void;
  on?: Record<string, (e: MessageEvent) => void>;
  retryMs?: number;
}

interface UseSseReturn {
  status: "idle" | "connecting" | "open" | "error" | "closed";
  close: () => void;
}

export function useSse(options: UseSseOptions = {}): UseSseReturn {
  const {
    enabled = true,
    baseUrl = process.env.REACT_APP_API_URL ?? "",
    onMessage,
    on,
    retryMs = 5000,
  } = options;

  const esRef = useRef<EventSource | null>(null);
  const stopRef = useRef(false);
  const [status, setStatus] = useState<UseSseReturn["status"]>("idle");

  const issueToken = async () => {
    const res = await requestAutoRefresh<{ token: string }>({
      path: "/sse/token",
      method: "POST",
      requiredLogin: true,
    });

    if (!res.isSuccess) {
      throw new Error("SSE 토큰 발급에 문제가 발생하였습니다.");
    }

    return res.data.token;
  };

  const connect = async () => {
    setStatus("connecting");
    try {
      const token = await issueToken();

      if (stopRef.current) return;

      const es = new EventSource(
        `${baseUrl}/sse/stream?token=${encodeURIComponent(token)}`
      );
      esRef.current = es;

      if (onMessage) es.onmessage = onMessage;
      if (on) {
        Object.entries(on).forEach(([name, handler]) => {
          es.addEventListener(name, handler as EventListener);
        });
      }

      es.onopen = () => setStatus("open");
      es.onerror = () => {
        setStatus("error");
        try {
          es.close();
        } catch {}
        esRef.current = null;
        if (!stopRef.current) setTimeout(connect, retryMs);
      };
    } catch (e) {
      setStatus("error");
      if (!stopRef.current) setTimeout(connect, retryMs);
    }
  };

  useEffect(() => {
    if (!enabled) return;
    stopRef.current = false;
    connect();
    return () => {
      stopRef.current = true;
      try {
        esRef.current?.close();
      } catch {}
      esRef.current = null;
      setStatus("closed");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, baseUrl]);

  const close = () => {
    stopRef.current = true;
    try {
      esRef.current?.close();
    } catch {}
    esRef.current = null;
    setStatus("closed");
  };

  return { status, close };
}
